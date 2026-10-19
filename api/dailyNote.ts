import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory cache to prevent spamming HoYoLAB servers (minimum 3 seconds interval per IP)
const ipRequestTimestamps = new Map<string, number>();

function detectServer(uid: string): string {
  const cleanUid = (uid || '').trim();
  if (cleanUid.startsWith('18')) return 'os_asia';
  const first = cleanUid.charAt(0);
  switch (first) {
    case '6': return 'os_usa';
    case '7': return 'os_euro';
    case '8': return 'os_asia';
    case '9': return 'os_cht';
    case '1':
    case '2': return 'cn_gf01';
    case '5': return 'cn_qd01';
    default: return 'os_asia';
  }
}

/**
 * Vercel Serverless Function to proxy HoYoLAB Daily Note API
 * For personal use: Reads credentials directly from environment variables.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 1. RATE LIMITING (Prevent IP ban / 429 from HoYoLAB)
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const lastRequest = ipRequestTimestamps.get(clientIp) || 0;
  
  if (now - lastRequest < 2500) {
    return res.status(429).json({
      retcode: -429,
      message: 'Vui lòng chờ vài giây trước khi làm mới lại.',
      data: null,
    });
  }
  ipRequestTimestamps.set(clientIp, now);

  try {
    const { uid: bodyUid, server: bodyServer } = req.body || {};
    
    // Priority: Environment variables first, then request body/headers
    const cookie = process.env.HOYOLAB_COOKIE || (req.headers['x-hoyolab-cookie'] as string);
    const uid = process.env.HOYOLAB_UID || bodyUid;
    const server = process.env.HOYOLAB_SERVER || bodyServer || (uid ? detectServer(uid) : 'os_asia');

    if (!cookie) {
      return res.status(400).json({
        retcode: -1,
        message: 'Chưa cấu hình biến môi trường HOYOLAB_COOKIE trong .env.local hoặc Vercel Environment Variables.',
        data: null,
      });
    }

    if (!uid) {
      return res.status(400).json({
        retcode: -1,
        message: 'Chưa cấu hình biến môi trường HOYOLAB_UID trong .env.local hoặc Vercel Environment Variables.',
        data: null,
      });
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
      let friendlyMsg = data.message || 'Lỗi khi gọi API HoYoLAB.';
      if (data.retcode === 10102 || data.retcode === 10104) {
        friendlyMsg = 'Dữ liệu Thời Gian Thực (Daily Note) chưa mở công khai. Vui lòng vào App HoYoLAB > Cài đặt quyền riêng tư > Bật "Hiển thị dữ liệu thời gian thực".';
      } else if (data.retcode === 10001 || data.retcode === -100) {
        friendlyMsg = 'Cookie HoYoLAB đã hết hạn hoặc không hợp lệ. Vui lòng cập nhật Cookie trong env.';
      } else if (data.retcode === 10101) {
        friendlyMsg = `Không tìm thấy nhân vật với UID ${uid} trên máy chủ ${server}. Hãy kiểm tra lại UID hoặc Server.`;
      }

      return res.status(200).json({
        retcode: data.retcode,
        message: friendlyMsg,
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
