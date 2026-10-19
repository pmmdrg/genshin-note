import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory cache to prevent spamming HoYoLAB servers (minimum 30 seconds interval per IP)
const ipRequestTimestamps = new Map<string, number>();

/**
 * Vercel Serverless Function to proxy HoYoLAB Daily Note API
 * Enhanced security:
 * - Requires APP_PIN verification if set in environment variables
 * - Rate limits requests to prevent HoYoverse IP blocking/rate-limiting
 * - Never leaks cookies or full errors to unauthorized callers
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 1. SECURITY PIN VERIFICATION (Protects public Vercel deployment)
  const serverPin = process.env.APP_PIN;
  if (serverPin) {
    const clientPin = req.headers['x-app-pin'];
    if (!clientPin || clientPin !== serverPin) {
      return res.status(401).json({
        retcode: -401,
        message: 'Mã PIN bảo mật không đúng hoặc chưa được cung cấp. Truy cập bị từ chối.',
        data: null,
      });
    }
  }

  // 2. RATE LIMITING (Prevent IP ban / 429 from HoYoLAB)
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const lastRequest = ipRequestTimestamps.get(clientIp) || 0;
  
  if (now - lastRequest < 5000) {
    // 5 seconds minimum cooldown
    return res.status(429).json({
      retcode: -429,
      message: 'Thao tác quá nhanh. Vui lòng chờ 5 giây trước khi đồng bộ lại.',
      data: null,
    });
  }
  ipRequestTimestamps.set(clientIp, now);

  try {
    const { uid: bodyUid, server: bodyServer } = req.body || {};
    
    const uid = bodyUid || process.env.HOYOLAB_UID;
    const server = bodyServer || process.env.HOYOLAB_SERVER || 'os_asia';
    
    // Cookie can come from client header or Vercel Environment Variables
    const cookie = (req.headers['x-hoyolab-cookie'] as string) || process.env.HOYOLAB_COOKIE;

    if (!uid) {
      return res.status(400).json({ message: 'Thiếu UID Genshin Impact' });
    }

    if (!cookie) {
      return res.status(401).json({ message: 'Chưa cấu hình Cookie HoYoLAB trong biến môi trường hoặc giao diện.' });
    }

    // Call HoYoLAB Daily Note API
    const hoyoUrl = `https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote?server=${encodeURIComponent(server)}&role_id=${encodeURIComponent(uid)}`;

    const hoyoResponse = await fetch(hoyoUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'x-rpc-app_version': '1.5.0',
        'x-rpc-client_type': '5',
        'x-rpc-language': 'vi-vn',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    });

    const data = await hoyoResponse.json();

    if (data.retcode !== 0) {
      return res.status(200).json({
        retcode: data.retcode,
        message: data.message || 'Lỗi khi gọi API HoYoLAB. Hãy kiểm tra Cookie & UID.',
        data: null,
      });
    }

    return res.status(200).json({
      retcode: 0,
      message: 'OK',
      data: data.data,
    });
  } catch (err: any) {
    return res.status(500).json({
      retcode: -1,
      message: err.message || 'Lỗi máy chủ khi kết nối HoYoLAB',
      data: null,
    });
  }
}
