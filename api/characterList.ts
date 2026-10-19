import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function to fetch full character list and equipment from HoYoLAB
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const cookie = process.env.HOYOLAB_COOKIE || (req.headers['x-hoyolab-cookie'] as string);
  const uid = process.env.HOYOLAB_UID || req.body?.uid;
  const server = process.env.HOYOLAB_SERVER || req.body?.server || 'os_asia';

  if (!cookie || !uid) {
    return res.status(400).json({
      retcode: -1,
      message: 'Thiếu Cookie hoặc UID trong biến môi trường.',
      data: null,
    });
  }

  try {
    const charUrl = 'https://bbs-api-os.hoyolab.com/game_record/genshin/api/character';

    const hoyoRes = await fetch(charUrl, {
      method: 'POST',
      headers: {
        'Cookie': cookie,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-rpc-app_version': '1.5.0',
        'x-rpc-client_type': '5',
        'x-rpc-language': 'vi-vn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        role_id: uid,
        server: server,
      }),
    });

    const data = await hoyoRes.json();

    if (data.retcode !== 0) {
      return res.status(200).json({
        retcode: data.retcode,
        message: data.message || 'Không thể lấy danh sách nhân vật từ HoYoLAB.',
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
      message: err.message || 'Lỗi server khi lấy dữ liệu nhân vật.',
      data: null,
    });
  }
}
