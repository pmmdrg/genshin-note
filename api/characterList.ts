import type { VercelRequest, VercelResponse } from '@vercel/node';

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
 * Vercel Serverless Function to fetch full character list and equipment from HoYoLAB
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const cookie = process.env.HOYOLAB_COOKIE || (req.headers['x-hoyolab-cookie'] as string);
  const uid = process.env.HOYOLAB_UID || req.body?.uid;
  const server = process.env.HOYOLAB_SERVER || req.body?.server || (uid ? detectServer(uid) : 'os_asia');

  if (!cookie || !uid) {
    return res.status(400).json({
      retcode: -1,
      message: 'Thiếu HOYOLAB_COOKIE hoặc HOYOLAB_UID trong biến môi trường.',
      data: null,
    });
  }

  try {
    const indexUrl = `https://bbs-api-os.hoyolab.com/game_record/genshin/api/index?server=${encodeURIComponent(server)}&role_id=${encodeURIComponent(uid)}`;

    const hoyoRes = await fetch(indexUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'Accept': 'application/json, text/plain, */*',
        'x-rpc-app_version': '1.5.0',
        'x-rpc-client_type': '5',
        'x-rpc-language': 'vi-vn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    });

    const data = await hoyoRes.json();

    if (data.retcode !== 0) {
      let friendlyMsg = data.message || 'Không thể lấy danh sách nhân vật từ HoYoLAB.';
      if (data.retcode === 10102 || data.retcode === 10104) {
        friendlyMsg = 'Dữ liệu Chiến Tích nhân vật chưa mở công khai. Vui lòng vào App HoYoLAB > Cài đặt quyền riêng tư > Bật "Hiển thị Chiến tích nhân vật".';
      }
      return res.status(200).json({
        retcode: data.retcode,
        message: friendlyMsg,
        data: null,
      });
    }

    // Best-effort: Fetch Enka.Network in-game showcase data to extract exact equipped weapons & artifacts
    let enkaAvatars: any[] = [];
    try {
      const enkaCtrl = new AbortController();
      const timer = setTimeout(() => enkaCtrl.abort(), 4000);
      const enkaRes = await fetch(`https://enka.network/api/uid/${encodeURIComponent(uid)}`, {
        signal: enkaCtrl.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });
      clearTimeout(timer);
      if (enkaRes.ok) {
        const enkaJson = await enkaRes.json();
        enkaAvatars = enkaJson.avatarInfoList || [];
      }
    } catch {
      // Ignore if Enka times out or is temporarily unavailable
    }

    const WEAPON_NAME_MAP: Record<string, string> = {
      // Polearms
      UI_EquipIcon_Pole_Kunwu: 'Giáo Nịnh Thần',
      UI_EquipIcon_Pole_BloodMoon: 'Xích Nguyệt Liêm',
      UI_EquipIcon_Pole_Homa: 'Trượng Homa',
      UI_EquipIcon_Pole_Narukami: 'Đoạn Thảo Trảm Quang',
      UI_EquipIcon_Pole_Zephyrus: 'Thương Tây Phong',
      UI_EquipIcon_Pole_Arakalari: 'Trăng Lưỡi Liềm Trôi Dạt',
      UI_EquipIcon_Pole_Ilmarinen: 'Gậy Vệt Cầu Vồng',
      UI_EquipIcon_Pole_TummaLyhty: 'Khúc Ca Đêm Tối',
      UI_EquipIcon_Pole_TheCatch: 'Lao Xiên Cá',
      UI_EquipIcon_Pole_Noire: 'Hắc Anh Thương',

      // Swords
      UI_EquipIcon_Sword_Dawn: 'Kiếm Bình Minh',
      UI_EquipIcon_Sword_Favonius: 'Tây Phong Kiếm',
      UI_EquipIcon_Sword_Fossil: 'Kiếm Tế Lễ',
      UI_EquipIcon_Sword_OuterSword: 'Ám Vũ Skirk',
      UI_EquipIcon_Sword_GlintstoneSword: 'Hắc Nham Trảm Kiếm',
      UI_EquipIcon_Sword_IronSting: 'Thiết Phong Kích',
      UI_EquipIcon_Sword_Transmutation: 'Khát Vọng Răng Kiếm',
      UI_EquipIcon_Sword_Regalis: 'Ánh Lửa Tự Do',
      UI_EquipIcon_Sword_Pleroma: 'Thanh Kiếm Tĩnh Lặng',
      UI_EquipIcon_Sword_Morion: 'Ánh Trăng Xiphos',
      UI_EquipIcon_Sword_Amenoma: 'Đoản Đao Amenoma',
      UI_EquipIcon_Sword_Narukami: 'Ánh Sáng Khói Sương',
      UI_EquipIcon_Sword_Deshret: 'Chìa Khóa Khaj-Nisut',

      // Claymores
      UI_EquipIcon_Claymore_Wolfmound: 'Đường Cùng Của Sói',
      UI_EquipIcon_Claymore_Itadori: 'Xích Giác Phá Thạch Đao',
      UI_EquipIcon_Claymore_Kurogane: 'Kiếm Ly Cốt',
      UI_EquipIcon_Claymore_Fish: 'Vua Biển Hàng Hiệu',
      UI_EquipIcon_Claymore_Perdue: 'Vũ Tài',
      UI_EquipIcon_Claymore_Mavuika: 'Trấn Mavuika',
      UI_EquipIcon_Claymore_Zephyrus: 'Đại Kiếm Tây Phong',
      UI_EquipIcon_Claymore_Fossil: 'Đại Kiếm Tế Lễ',
      UI_EquipIcon_Claymore_Whiteblind: 'Bạch Ảnh Kiếm',
      UI_EquipIcon_Claymore_Millennial: 'Tiếng Gió Trong Rừng Thông',
      UI_EquipIcon_Claymore_TheCatch: 'Hải Đăng Bờ Biển Sậy',

      // Catalysts
      UI_EquipIcon_Catalyst_Brisingamen: 'Chân Ngụy Thiên Ngân',
      UI_EquipIcon_Catalyst_Fossil: 'Mảnh Chương Tế Lễ',
      UI_EquipIcon_Catalyst_Ilmarinen: 'Vòng Xoáy Dập Dềnh',
      UI_EquipIcon_Catalyst_Ayus: 'Cõi Mộng Ngàn Đêm',
      UI_EquipIcon_Catalyst_Iudex: 'Dòng Chảy Giám Sát',
      UI_EquipIcon_Catalyst_Zephyrus: 'Tây Phong Bí Điển',
      UI_EquipIcon_Catalyst_Widsith: 'Chương Nhạc Lang Thang',

      // Bows
      UI_EquipIcon_Bow_Favonius: 'Cung Tây Phong',
      UI_EquipIcon_Bow_Fossil: 'Cung Tế Lễ',
      UI_EquipIcon_Bow_Troupe: 'Tuyệt Huyền',
      UI_EquipIcon_Bow_Harp: 'Cánh Thiên Không',
      UI_EquipIcon_Bow_Amos: 'Cung Amos',
      UI_EquipIcon_Bow_Kirin: 'Nhược Thủy',
    };

    const RELIC_SET_MAP: Record<string, string> = {
      '15003': 'Đoàn Hát Lang Thang',
      '15005': 'Bóng Hình Màu Xanh',
      '15006': 'Nghi Thức Tông Thất Cổ',
      '15008': 'Diệm Liệt Ma Nữ Cháy Rực',
      '15009': 'Băng Giá Dũng Sĩ',
      '15014': 'Bạch Ngân Sấm Sét',
      '15017': 'Thiên Nham Vững Chắc',
      '15020': 'Dấu Ấn Ngăn Trở',
      '15021': 'Giáp Hoa Nở Rộ',
      '15025': 'Ký Ức Rừng Sâu',
      '15026': 'Giấc Mộng Hoàng Kim',
      '15027': 'Đoá Hoa Trang Viên Lạc Lối',
      '15032': 'Thợ Săn Marechaussee',
      '15033': 'Đoàn Kịch Hoàng Kim',
      '15035': 'Mảnh Hài Hòa Hư Ảo',
      '15040': 'Nguyện Ước Dị Giới (Skirk)',
      '15041': 'Cuộn Bí Ẩn Dũng Sĩ Tro Tàn',
      '15042': 'Dũng Sĩ Hỏa Diệm Khắc Họa',
      '15043': 'Khúc Ca Băng Tuyết Dạ Thần',
      '15048': 'Vết Tích Đêm Huyền Bí',
    };

    const POS_NAME_MAP: Record<string, string> = {
      EQUIP_BRACER: 'Hoa Sự Sống',
      EQUIP_NECKLACE: 'Lông Vũ Tử Thần',
      EQUIP_SHOES: 'Cát Thời Gian',
      EQUIP_RING: 'Ly Không Gian',
      EQUIP_DRESS: 'Nón Lý Trí',
    };

    // Merge exact equipment from Enka showcase into HoYoLAB avatars
    const mergedAvatars = (data.data?.avatars || []).map((avatar: any) => {
      const enkaMatch = enkaAvatars.find((ea: any) => ea.avatarId === avatar.id);
      if (enkaMatch) {
        const enkaWeapon = enkaMatch.equipList?.find((e: any) => e.weapon);
        const enkaRelics = enkaMatch.equipList?.filter((e: any) => e.flat?.itemType === 'ITEM_RELIQUARY') || [];

        const weaponIcon = enkaWeapon?.flat?.icon;
        const weaponName = weaponIcon && WEAPON_NAME_MAP[weaponIcon]
          ? WEAPON_NAME_MAP[weaponIcon]
          : (avatar.weapon?.name || 'Vũ Khí Trang Bị');

        // Extract primary relic set from the 5 equipped relics
        let mainSetName = 'Bộ Thánh Di Vật';
        if (enkaRelics.length > 0) {
          const firstRelicIcon = enkaRelics[0].flat?.icon || '';
          const match = firstRelicIcon.match(/150\d{2}/);
          if (match && RELIC_SET_MAP[match[0]]) {
            mainSetName = `${RELIC_SET_MAP[match[0]]} (4 món)`;
          }
        }

        return {
          ...avatar,
          weapon: enkaWeapon
            ? {
                name: weaponName,
                icon: weaponIcon ? `https://enka.network/ui/${weaponIcon}.png` : null,
                rarity: enkaWeapon.flat?.rankLevel || 4,
                level: enkaWeapon.weapon?.level || 90,
                affix_level: ((Object.values(enkaWeapon.weapon?.affixMap || {})[0] as number) ?? 0) + 1,
                rawIcon: weaponIcon,
              }
            : avatar.weapon,
          relics: enkaRelics.length
            ? enkaRelics.map((r: any) => {
                const rIcon = r.flat?.icon || '';
                const setMatch = rIcon.match(/150\d{2}/);
                const sName = setMatch && RELIC_SET_MAP[setMatch[0]] ? RELIC_SET_MAP[setMatch[0]] : mainSetName;
                const posName = POS_NAME_MAP[r.flat?.equipType] || 'Hoa Sự Sống';
                return {
                  name: `${sName} - ${posName}`,
                  icon: rIcon ? `https://enka.network/ui/${rIcon}.png` : null,
                  pos_name: posName,
                  rarity: r.flat?.rankLevel || 5,
                  level: r.reliquary?.level ? r.reliquary.level - 1 : 20,
                  set: { name: sName },
                };
              })
            : avatar.relics,
          showcaseTalents: enkaMatch.skillLevelMap || null,
        };
      }
      return avatar;
    });

    return res.status(200).json({
      retcode: 0,
      message: 'OK',
      data: {
        avatars: mergedAvatars,
        role: data.data?.role || null,
        stats: data.data?.stats || null,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      retcode: -1,
      message: err.message || 'Lỗi server khi lấy dữ liệu nhân vật.',
      data: null,
    });
  }
}
