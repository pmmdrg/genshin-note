import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function to execute HoYoLAB Daily Web Check-in
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const cookie = process.env.HOYOLAB_COOKIE || (req.headers['x-hoyolab-cookie'] as string);

  if (!cookie) {
    return res.status(400).json({
      retcode: -1,
      message: 'Chưa cấu hình HOYOLAB_COOKIE trong biến môi trường.',
    });
  }

  try {
    const actId = 'e202102251931481'; // Genshin Impact Global Daily Check-in Event ID
    const checkInUrl = `https://sg-hk4e-api.hoyolab.com/event/sol/sign?act_id=${actId}`;

    const hoyoRes = await fetch(checkInUrl, {
      method: 'POST',
      headers: {
        'Cookie': cookie,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-rpc-app_version': '1.5.0',
        'x-rpc-client_type': '5',
        'x-rpc-language': 'vi-vn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({ act_id: actId }),
    });

    const data = await hoyoRes.json();

    if (data.retcode === 0) {
      return res.status(200).json({
        retcode: 0,
        message: 'Điểm danh thành công! Đã gửi quà vào hòm thư in-game.',
        data: data.data,
      });
    } else if (data.retcode === -5003) {
      return res.status(200).json({
        retcode: -5003,
        message: 'Hôm nay bạn đã điểm danh rồi!',
        data: null,
      });
    }

    return res.status(200).json({
      retcode: data.retcode,
      message: data.message || 'Lỗi khi điểm danh HoYoLAB.',
      data: null,
    });
  } catch (err: any) {
    return res.status(500).json({
      retcode: -1,
      message: err.message || 'Lỗi server khi kết nối điểm danh',
    });
  }
}
