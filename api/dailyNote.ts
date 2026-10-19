import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function to proxy HoYoLAB Daily Note API
 * Bypasses browser CORS and securely handles cookie authentication for personal use.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { uid, server = 'os_asia' } = req.body || {};
    
    // Cookie can come from client header or from Vercel Environment Variables
    const cookie = (req.headers['x-hoyolab-cookie'] as string) || process.env.HOYOLAB_COOKIE;

    if (!uid) {
      return res.status(400).json({ message: 'Thiếu UID Genshin Impact' });
    }

    if (!cookie) {
      return res.status(401).json({ message: 'Chưa cấu hình Cookie HoYoLAB' });
    }

    // Call internal HoYoLAB Daily Note API
    const hoyoUrl = `https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote?server=${encodeURIComponent(server)}&role_id=${encodeURIComponent(uid)}`;

    const hoyoResponse = await fetch(hoyoUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'x-rpc-app_version': '1.5.0',
        'x-rpc-client_type': '5',
        'x-rpc-language': 'vi-vn',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
