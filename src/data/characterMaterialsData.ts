/**
 * Genshin Impact Character Material Database (Vietnamese & Official Icons)
 * Complete mappings for:
 * - World Boss Material (Nguyên Liệu Boss Thế Giới)
 * - Weekly Boss Material (Nguyên Liệu Boss Tuần)
 * - Local Specialty (Đặc Sản Khu Vực)
 */

export interface CharacterMaterialDetail {
  worldBossMat: string;
  worldBossMatIcon: string;
  weeklyBossMat: string;
  weeklyBossMatIcon: string;
  localSpecialty: string;
  localSpecialtyIcon: string;
}

export const CHARACTER_MATERIALS: Record<string, CharacterMaterialDetail> = {
  // Natlan
  mavuika: {
    worldBossMat: 'Con Mắt Bí Mật Rực Cháy',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113063.png',
    weeklyBossMat: 'Vật Ăn Mòn Xói Mòn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113064.png',
    localSpecialty: 'Cúc Tàn Tích',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101249.png',
  },
  xilonen: {
    worldBossMat: 'Nhẫn Bí Mật',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113061.png',
    weeklyBossMat: 'Lông Vũ Xói Mòn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113065.png',
    localSpecialty: 'Cúc Rực Rỡ',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101248.png',
  },
  kinich: {
    worldBossMat: 'Móng Vuốt Bạo Chúa',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113060.png',
    weeklyBossMat: 'Vật Ăn Mòn Xói Mòn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113064.png',
    localSpecialty: 'Quả Mọng Thịt',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101245.png',
  },
  kachina: {
    worldBossMat: 'Móng Vuốt Bạo Chúa',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113060.png',
    weeklyBossMat: 'Lông Vũ Xói Mòn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113065.png',
    localSpecialty: 'Quả Quenepa',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101246.png',
  },
  chasca: {
    worldBossMat: 'Hạt Tinh Thể Rực Lửa',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113062.png',
    weeklyBossMat: 'Tơ Tằm Xói Mòn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113066.png',
    localSpecialty: 'Cúc Tàn Tích',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101249.png',
  },

  // Fontaine
  furina: {
    worldBossMat: 'Nước Không Thể Tan',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113053.png',
    weeklyBossMat: 'Dây Tơ Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Hoa Hồ Trung Cảnh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  },
  neuvillette: {
    worldBossMat: 'Sừng Kỳ Dị',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113051.png',
    weeklyBossMat: 'Trọng Khối Căn Nguyên',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113057.png',
    localSpecialty: 'Sao Biển Tinh Khiết',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101234.png',
  },
  arlecchino: {
    worldBossMat: 'Mảnh Tàn Tích Hoàng Kim',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113058.png',
    weeklyBossMat: 'Ngọn Lửa Khắc Ghi',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113059.png',
    localSpecialty: 'Hoa Cầu Vồng',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101231.png',
  },
  navia: {
    worldBossMat: 'Linh Kiện Lắp Ráp Máy (Coppelius)',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    weeklyBossMat: 'Dây Tơ Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Giọt Lệ Tươi',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101236.png',
  },
  wriothesley: {
    worldBossMat: 'Thiết Bị Thăm Dò Tourbillon',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113052.png',
    weeklyBossMat: 'Trọng Khối Căn Nguyên',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113057.png',
    localSpecialty: 'Bọ Thám Hiểm',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101233.png',
  },
  lyney: {
    worldBossMat: 'Phán Quyết Của Hoàng Đế',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113050.png',
    weeklyBossMat: 'Hoa Nguyên Thủy',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113047.png',
    localSpecialty: 'Hoa Cầu Vồng',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101231.png',
  },
  lynette: {
    worldBossMat: 'Linh Kiện Lắp Ráp Máy (Coppelia)',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113054.png',
    weeklyBossMat: 'Hổ Phách Vĩnh Hằng',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113048.png',
    localSpecialty: 'Chuông Gió Lumidouce',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101232.png',
  },
  charlotte: {
    worldBossMat: 'Thiết Bị Thăm Dò Tourbillon',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113052.png',
    weeklyBossMat: 'Dây Tơ Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Beryl Lam Tinh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101230.png',
  },
  freminet: {
    worldBossMat: 'Linh Kiện Lắp Ráp Máy (Coppelius)',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    weeklyBossMat: 'Hoa Nguyên Thủy',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113047.png',
    localSpecialty: 'Chuông Gió Lumidouce',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101232.png',
  },
  chevreuse: {
    worldBossMat: 'Sừng Kỳ Dị',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113051.png',
    weeklyBossMat: 'Khối Nước Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113056.png',
    localSpecialty: 'Chuông Gió Lumidouce',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101232.png',
  },
  clorinde: {
    worldBossMat: 'Mảnh Tàn Tích Hoàng Kim',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113058.png',
    weeklyBossMat: 'Hổ Phách Vĩnh Hằng',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113048.png',
    localSpecialty: 'Chuông Gió Lumidouce',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101232.png',
  },
  sigewinne: {
    worldBossMat: 'Nước Không Thể Tan',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113053.png',
    weeklyBossMat: 'Dây Tơ Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Hoa Hồ Trung Cảnh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  },
  emilie: {
    worldBossMat: 'Mảnh Tàn Tích Hoàng Kim',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113058.png',
    weeklyBossMat: 'Ngọn Lửa Khắc Ghi',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113059.png',
    localSpecialty: 'Hoa Hồ Trung Cảnh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  },

  // Sumeru
  nahida: {
    worldBossMat: 'Bào Tử Diệt Quỷ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113038.png',
    weeklyBossMat: 'Dây Tơ Rối',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113042.png',
    localSpecialty: 'Sen Kalpalata',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101217.png',
  },
  alhaitham: {
    worldBossMat: 'Nhụy Hoa Sa Mạc',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113041.png',
    weeklyBossMat: 'Gương Mushin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113043.png',
    localSpecialty: 'Nhụy Cát',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101222.png',
  },
  wanderer: {
    worldBossMat: 'Búp Sen Rỗng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113039.png',
    weeklyBossMat: 'Chuông Daka',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113044.png',
    localSpecialty: 'Nấm Thánh Rukkhashava',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101213.png',
  },
  cyno: {
    worldBossMat: 'Hạt Sấm Sét Tinh Thể',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113037.png',
    weeklyBossMat: 'Khối Trầm Luân',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113034.png',
    localSpecialty: 'Bọ Hung Sa Mạc',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101219.png',
  },
  tighnari: {
    worldBossMat: 'Mỏ Chim Vua Nấm',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113036.png',
    weeklyBossMat: 'Khối Trầm Luân',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113034.png',
    localSpecialty: 'Sen Nilotpala',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101215.png',
  },
  nilou: {
    worldBossMat: 'Búp Sen Rỗng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113039.png',
    weeklyBossMat: 'Nước Mắt Tai Ương',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113033.png',
    localSpecialty: 'Hoa Padisarah',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101216.png',
  },
  faruzan: {
    worldBossMat: 'Hạt Lạc Lối Ánh Đỏ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113040.png',
    weeklyBossMat: 'Dây Tơ Rối',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113042.png',
    localSpecialty: 'Quả Henna',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101218.png',
  },
  collei: {
    worldBossMat: 'Mỏ Chim Vua Nấm',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113036.png',
    weeklyBossMat: 'Nước Mắt Tai Ương',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113033.png',
    localSpecialty: 'Nấm Thánh Rukkhashava',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101213.png',
  },
  kaveh: {
    worldBossMat: 'Bào Tử Diệt Quỷ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113038.png',
    weeklyBossMat: 'Hoa Nguyên Thủy',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113047.png',
    localSpecialty: 'Hoa Điệp Tang',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101223.png',
  },
  candace: {
    worldBossMat: 'Hạt Lạc Lối Ánh Đỏ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113040.png',
    weeklyBossMat: 'Nước Mắt Tai Ương',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113033.png',
    localSpecialty: 'Quả Henna',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101218.png',
  },
  sethos: {
    worldBossMat: 'Mây Mù Ngưng Đọng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113054.png',
    weeklyBossMat: 'Chuông Daka',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113044.png',
    localSpecialty: 'Nhụy Cát',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101222.png',
  },
  layla: {
    worldBossMat: 'Búp Sen Rỗng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113039.png',
    weeklyBossMat: 'Gương Mushin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113043.png',
    localSpecialty: 'Sen Nilotpala',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101215.png',
  },
  dehya: {
    worldBossMat: 'Hạt Lạc Lối Ánh Đỏ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113040.png',
    weeklyBossMat: 'Dây Tơ Rối',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113042.png',
    localSpecialty: 'Nhụy Cát',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101222.png',
  },
  baizhu: {
    worldBossMat: 'Chiếc Nhẫn Hắc Ám',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113046.png',
    weeklyBossMat: 'Hoa Nguyên Thủy',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113047.png',
    localSpecialty: 'Lưu Ly Biện',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100034.png',
  },

  // Inazuma
  'raiden shogun': {
    worldBossMat: 'Hạt Sen Sấm Sét',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113023.png',
    weeklyBossMat: 'Thời Khắc Tan Biến',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113025.png',
    localSpecialty: 'Quả Amakumo',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101207.png',
  },
  'kaedehara kazuha': {
    worldBossMat: 'Mảnh Ma Kiếm Phong Ma',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113014.png',
    weeklyBossMat: 'Vảy Vàng Azhdaha',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113019.png',
    localSpecialty: 'Nấm Rơm Biển',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101201.png',
  },
  'kamisato ayaka': {
    worldBossMat: 'Tim Vĩnh Cửu',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113018.png',
    weeklyBossMat: 'Nhánh Huyết Ngọc',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113020.png',
    localSpecialty: 'Hoa Anh Đào',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101202.png',
  },
  'kamisato ayato': {
    worldBossMat: 'Nước Tinh Khiết Chưa Kích Hoạt',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113028.png',
    weeklyBossMat: 'Khối Trầm Luân',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113034.png',
    localSpecialty: 'Hoa Anh Đào',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101202.png',
  },
  'yae miko': {
    worldBossMat: 'Vây Giả Khát Máu',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113031.png',
    weeklyBossMat: 'Giấc Mộng Hoàng Kim',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113032.png',
    localSpecialty: 'Nấm Rơm Biển',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101201.png',
  },
  yoimiya: {
    worldBossMat: 'Bốc Hỏa Khói Đỏ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113022.png',
    weeklyBossMat: 'Vương Miện Rồng Lãnh Chúa',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113021.png',
    localSpecialty: 'Cỏ Naku',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101203.png',
  },
  'kuki shinobu': {
    worldBossMat: 'Bánh Răng Cổ Xưa',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113035.png',
    weeklyBossMat: 'Nước Mắt Tai Ương',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113033.png',
    localSpecialty: 'Cỏ Naku',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101203.png',
  },
  thoma: {
    worldBossMat: 'Bốc Hỏa Khói Đỏ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113022.png',
    weeklyBossMat: 'Bướm Địa Ngục',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113024.png',
    localSpecialty: 'Nấm U Ám',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101209.png',
  },
  'kujou sara': {
    worldBossMat: 'Hạt Sen Sấm Sét',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113023.png',
    weeklyBossMat: 'Trái Tim Tro Tàn',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113026.png',
    localSpecialty: 'Huyết Tinh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101204.png',
  },
  kirara: {
    worldBossMat: 'Chiếc Nhẫn Hắc Ám',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113046.png',
    weeklyBossMat: 'Hổ Phách Vĩnh Hằng',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113048.png',
    localSpecialty: 'Quả Amakumo',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101207.png',
  },
  'sangonomiya kokomi': {
    worldBossMat: 'Nước Tinh Khiết Chưa Kích Hoạt',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113028.png',
    weeklyBossMat: 'Bướm Địa Ngục',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113024.png',
    localSpecialty: 'Ngọc San Hô',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101208.png',
  },
  'arataki itto': {
    worldBossMat: 'Vây Giả Khát Máu',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113031.png',
    weeklyBossMat: 'Tro Tàn Hỏa Diệm',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113026.png',
    localSpecialty: 'Onikabuto',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101205.png',
  },

  // Liyue
  zhongli: {
    worldBossMat: 'Tháp Huyền Nham',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113009.png',
    weeklyBossMat: 'Chiếc Sừng Thôn Tinh',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113013.png',
    localSpecialty: 'Dạ Bạc Thạch',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100028.png',
  },
  'hu tao': {
    worldBossMat: 'Ngọc Chưa Chín',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113017.png',
    weeklyBossMat: 'Mảnh Ma Kiếm Tàn Ma',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113014.png',
    localSpecialty: 'Hoa Nghê Thường',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100030.png',
  },
  yelan: {
    worldBossMat: 'Bánh Răng Cổ Xưa',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113035.png',
    weeklyBossMat: 'Vảy Vàng Azhdaha',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113019.png',
    localSpecialty: 'Tinh Xà',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100033.png',
  },
  xiao: {
    worldBossMat: 'Ngọc Chưa Chín',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113017.png',
    weeklyBossMat: 'Linh Hồn Đột Biến',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113015.png',
    localSpecialty: 'Hoa Thanh Tâm',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100031.png',
  },
  ganyu: {
    worldBossMat: 'Hạt Ươm Cực Hàn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113010.png',
    weeklyBossMat: 'Linh Hồn Đột Biến',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113015.png',
    localSpecialty: 'Hoa Thanh Tâm',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100031.png',
  },
  keqing: {
    worldBossMat: 'Lăng Kính Lôi Điện',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113004.png',
    weeklyBossMat: 'Chiếc Nhẫn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113007.png',
    localSpecialty: 'Thạch Phách',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100028.png',
  },
  qiqi: {
    worldBossMat: 'Hạt Ươm Cực Hàn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113010.png',
    weeklyBossMat: 'Đuôi Bắc Phong Vương Lang',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113006.png',
    localSpecialty: 'Lưu Ly Biện',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100034.png',
  },
  xiangling: {
    worldBossMat: 'Hạt Giống Lửa Vĩnh Hằng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113011.png',
    weeklyBossMat: 'Móng Vuốt Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113002.png',
    localSpecialty: 'Ớt Tuyệt Vân',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100027.png',
  },
  xingqiu: {
    worldBossMat: 'Trái Tim Thuần Khiết',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113012.png',
    weeklyBossMat: 'Đuôi Bắc Phong Vương Lang',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113006.png',
    localSpecialty: 'Hoa Nghê Thường',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100030.png',
  },
  ningguang: {
    worldBossMat: 'Tháp Huyền Nham',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113009.png',
    weeklyBossMat: 'Linh Hồn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113008.png',
    localSpecialty: 'Bách Hợp Lưu Ly',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100029.png',
  },
  gaming: {
    worldBossMat: 'Phán Quyết Của Hoàng Đế',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113050.png',
    weeklyBossMat: 'Khối Nước Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113056.png',
    localSpecialty: 'Tinh Thể Tinh Thiết',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101237.png',
  },
  yanfei: {
    worldBossMat: 'Ngọc Chưa Chín',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113017.png',
    weeklyBossMat: 'Nhánh Huyết Ngọc',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113020.png',
    localSpecialty: 'Dạ Bạc Thạch',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100028.png',
  },
  yaoyao: {
    worldBossMat: 'Bào Tử Diệt Quỷ',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113038.png',
    weeklyBossMat: 'Dây Tơ Rối',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113042.png',
    localSpecialty: 'Ớt Tuyệt Vân',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100027.png',
  },
  'yun jin': {
    worldBossMat: 'Vây Giả Khát Máu',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113031.png',
    weeklyBossMat: 'Tro Tàn Hỏa Diệm',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113026.png',
    localSpecialty: 'Bách Hợp Lưu Ly',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100029.png',
  },
  chongyun: {
    worldBossMat: 'Hạt Ươm Cực Hàn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113010.png',
    weeklyBossMat: 'Hơi Thở Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113003.png',
    localSpecialty: 'Thạch Phách',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100028.png',
  },
  xianyun: {
    worldBossMat: 'Mây Mù Ngưng Đọng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113054.png',
    weeklyBossMat: 'Khối Nước Không Ám',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113056.png',
    localSpecialty: 'Tinh Thể Tinh Thiết',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101237.png',
  },
  shenhe: {
    worldBossMat: 'Vây Giả Khát Máu',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113031.png',
    weeklyBossMat: 'Bướm Địa Ngục',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113024.png',
    localSpecialty: 'Hoa Thanh Tâm',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100031.png',
  },

  // Mondstadt
  bennett: {
    worldBossMat: 'Hạt Giống Lửa Vĩnh Hằng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113011.png',
    weeklyBossMat: 'Lông Vũ Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113001.png',
    localSpecialty: 'Cúc Cánh Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100024.png',
  },
  diluc: {
    worldBossMat: 'Hạt Giống Lửa Vĩnh Hằng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113011.png',
    weeklyBossMat: 'Lông Vũ Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113001.png',
    localSpecialty: 'Quả Tiểu Đăng',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100025.png',
  },
  jean: {
    worldBossMat: 'Hạt Giống Bão Lốc',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113003.png',
    weeklyBossMat: 'Lông Vũ Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113001.png',
    localSpecialty: 'Hạt Bồ Công Anh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100022.png',
  },
  mona: {
    worldBossMat: 'Trái Tim Thuần Khiết',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113012.png',
    weeklyBossMat: 'Chiếc Nhẫn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113007.png',
    localSpecialty: 'Nấm Rơm Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100023.png',
  },
  fischl: {
    worldBossMat: 'Lăng Kính Lôi Điện',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113004.png',
    weeklyBossMat: 'Linh Hồn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113008.png',
    localSpecialty: 'Quả Tiểu Đăng',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100025.png',
  },
  sucrose: {
    worldBossMat: 'Hạt Giống Bão Lốc',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113003.png',
    weeklyBossMat: 'Linh Hồn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113008.png',
    localSpecialty: 'Cúc Cánh Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100024.png',
  },
  noelle: {
    worldBossMat: 'Tháp Huyền Nham',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113009.png',
    weeklyBossMat: 'Móng Vuốt Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113002.png',
    localSpecialty: 'Lạc Bạch Thạch',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100021.png',
  },
  diona: {
    worldBossMat: 'Hạt Ươm Cực Hàn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113010.png',
    weeklyBossMat: 'Mảnh Ma Kiếm Tàn Ma',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113014.png',
    localSpecialty: 'Hoa Loa Kèn Calla',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100026.png',
  },
  barbara: {
    worldBossMat: 'Trái Tim Thuần Khiết',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113012.png',
    weeklyBossMat: 'Chiếc Nhẫn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113007.png',
    localSpecialty: 'Nấm Rơm Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100023.png',
  },
  rosaria: {
    worldBossMat: 'Hạt Ươm Cực Hàn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113010.png',
    weeklyBossMat: 'Linh Hồn Đột Biến',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113015.png',
    localSpecialty: 'Lạc Bạch Thạch',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100021.png',
  },
  razor: {
    worldBossMat: 'Lăng Kính Lôi Điện',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113004.png',
    weeklyBossMat: 'Móng Vuốt Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113002.png',
    localSpecialty: 'Quả Móc Câu',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100020.png',
  },
  mika: {
    worldBossMat: 'Trục Bán Dẫn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113041.png',
    weeklyBossMat: 'Gương Mushin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113043.png',
    localSpecialty: 'Cúc Cánh Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100024.png',
  },
  venti: {
    worldBossMat: 'Hạt Giống Bão Lốc',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113003.png',
    weeklyBossMat: 'Đuôi Bắc Phong Vương Lang',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113006.png',
    localSpecialty: 'Hoa Cecilia',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100022.png',
  },
  klee: {
    worldBossMat: 'Hạt Giống Lửa Vĩnh Hằng',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113011.png',
    weeklyBossMat: 'Chiếc Nhẫn Bắc Phong',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113007.png',
    localSpecialty: 'Nấm Rơm Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100023.png',
  },
  albedo: {
    worldBossMat: 'Tháp Huyền Nham',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113009.png',
    weeklyBossMat: 'Chiếc Sừng Thôn Tinh',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113013.png',
    localSpecialty: 'Hoa Cecilia',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100022.png',
  },
  eula: {
    worldBossMat: 'Tinh Thể Cực Lạnh',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113020.png',
    weeklyBossMat: 'Vương Miện Rồng Lãnh Chúa',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113021.png',
    localSpecialty: 'Hạt Bồ Công Anh',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100022.png',
  },

  // Traveler
  'nhà lữ hành': {
    worldBossMat: 'Kim Cương Bạc Vụn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_104101.png',
    weeklyBossMat: 'Lông Vũ Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113001.png',
    localSpecialty: 'Cúc Cánh Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100024.png',
  },
  traveler: {
    worldBossMat: 'Kim Cương Bạc Vụn',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_104101.png',
    weeklyBossMat: 'Lông Vũ Dvalin',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113001.png',
    localSpecialty: 'Cúc Cánh Gió',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_100024.png',
  },
};

/**
 * Normalizes character name string for robust lookup
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // remove parenthesized suffix e.g. "(Thảo Thần)", "(Quan Chấp Hành)"
    .trim();
}

/**
 * Resolves accurate materials for a character
 */
export function getCharacterMaterialDetail(characterName: string): CharacterMaterialDetail {
  const key = normalizeName(characterName);

  if (CHARACTER_MATERIALS[key]) {
    return CHARACTER_MATERIALS[key];
  }

  // Partial match search
  for (const [k, detail] of Object.entries(CHARACTER_MATERIALS)) {
    if (key.includes(k) || k.includes(key)) {
      return detail;
    }
  }

  // Fallback if not found
  return {
    worldBossMat: 'Nguyên Liệu Boss Thế Giới',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113059.png',
    weeklyBossMat: 'Nguyên Liệu Boss Tuần',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Đặc Sản Khu Vực',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  };
}
