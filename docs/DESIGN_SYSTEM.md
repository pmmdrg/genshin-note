# Quy Chuẩn Thiết Kế Giao Diện (Design System & UI/UX)

Tài liệu này quy định chi tiết về phong cách thị giác, cách sử dụng biểu tượng, biên tập nội dung text và tích hợp hình ảnh trong toàn bộ ứng dụng Genshin Note.

---

## 💎 1. Phong Cách Thiết Kế: Liquid Glass

Toàn bộ ứng dụng sử dụng giao diện lấy cảm hứng từ kính lỏng (Liquid Glassmorphism) kết hợp không gian vũ trụ/tinh hà của Genshin Impact.

### Các class CSS chủ đạo:
- **`liquid-glass`**: Lớp kính chính cho các thẻ card lớn, modal, bảng dữ liệu:
  - Nền bán trong suốt tối màu: `bg-[#0d111a]/70` hoặc `backdrop-blur-xl`.
  - Viền kính mảnh: `border border-white/[0.08]` (khi hover có thể sáng lên `hover:border-white/20`).
  - Bo góc mềm mại: `rounded-3xl` hoặc `rounded-2xl`.
- **`liquid-glass-subtle`**: Lớp kính phụ cho các thanh công cụ, pill, tab chọn:
  - `bg-white/[0.03]`, viền `border-white/[0.06]`, `backdrop-blur-md`.
- **Bảng màu & Gradient phát sáng (Glows)**:
  - Nguyên Tố Phong / Thủy: `cyan-500`, `teal-500`, `blue-500`.
  - Nguyên Tố Hỏa / Nham / 5★ Vàng: `amber-500`, `orange-500`.
  - Nguyên Tố Lôi / Bắt Sáng: `purple-500`, `pink-500`, `indigo-500`.
  - Thành công / May mắn: `emerald-500`.
  - Thất bại / Lệch rate: `rose-500`.

---

## 🚫 2. Quy Tắc Dùng Biểu Tượng (Icon): Tiết Chế & Đúng Chỗ

> **Yêu cầu của người dùng**: *"Hạn chế dùng icon dư thừa và bừa bãi"*.

### Khi NÀO ĐƯỢC DÙNG icon:
1. **Menu điều hướng chính (`Sidebar`)**: Giúp nhận diện chuyên mục nhanh chóng (Nhân vật, Việc cần làm, Hoàn thành, Cầu nguyện, Lịch phiên bản).
2. **Nút bấm hành động (Action Buttons)**: `Plus` (Thêm), `Edit2` (Sửa), `Trash2` (Xóa), `Sliders` (Cài đặt), `RotateCcw` (Đặt lại).
3. **Chỉ báo trạng thái đặc thù**: Huy hiệu bảo hiểm (`Shield`), bắt sáng (`Sparkles`), tích chọn (`CheckCircle2`).

### Khi NÀO KHÔNG ĐƯỢC DÙNG icon:
1. **Không gắn icon trước mọi dòng dữ liệu**: Tránh việc mỗi dòng ngày tháng, số roll, số nguyên thạch đều gắn 1 icon vô nghĩa.
2. **Không dùng icon chỉ để trang trí tiêu đề phụ**: Nếu tiêu đề đã rõ nghĩa bằng chữ, không cần chèn thêm 2-3 icon lấp lánh xung quanh.
3. **Không lặp lại icon liên tiếp**: Trong cùng một khối thẻ nhỏ (ví dụ card Phase 1), không dùng lại icon lịch nếu bên ngoài đã có icon lịch.
4. **Hạn chế emoji bừa bãi**: Tránh chèn các emoji cảm xúc (`🔥`, `✨`, `⭐`, `🎉`) vào giữa các dòng dữ liệu thông số kỹ thuật.

---

## ✂️ 3. Quy Tắc Câu Từ & Nội Dung (Text & Copy): Ngắn Gọn & Không Lặp Lại

> **Yêu cầu của người dùng**: *"Hạn chế các text lặp lại và không cần thiết"*.

### Nguyên tắc biên tập:
1. **Hiển thị trực tiếp dữ liệu cần xem**:
   - ❌ *Không tốt*: `"Thời gian bắt đầu chính thức của giai đoạn này là lúc 10:00 sáng ngày Thứ Tư 04/11/2026 sau khi bảo trì xong"`
   -  *Tốt*: `"Bắt đầu: 10:00 • Thứ Tư, 04/11/2026"`
2. **Không lặp lại thông tin giữa các cấp độ**:
   - Nếu thẻ con (Phase 1, Phase 2) đã ghi cụ thể ngày giờ, thì thanh tiêu đề bên ngoài **không** cần phải tạo thêm một thanh pill tóm tắt lại ngày giờ đó.
   - Nếu thông tin bảo hiểm đã hiển thị ở tỷ lệ thắng thua 50/50, thì không cần thêm một dòng giải thích lặp lại "đã tính/không tính vào 50/50".
3. **Xóa bỏ các đoạn mô tả boilerplate**:
   - Không viết các đoạn văn chung chung hiển nhiên (ví dụ: *"Bản cập nhật sẽ mang đến sự kiện mới, vũ khí mới và nhiều điều thú vị..."*). Người dùng cần công cụ tra cứu số liệu chính xác, không cần đọc bài báo quảng cáo.

---

## 🖼️ 4. Quy Chuẩn Tài Nguyên & Hình Ảnh (Media & Assets)

> **Yêu cầu của người dùng**: *"Cố gắng lấy ảnh của nhân vật, vũ khí, nguyên liệu khi có thể"*.

### Nguồn hình ảnh chuẩn:
1. **Ảnh đại diện Nhân Vật (Avatar)**:
   - Sử dụng định dạng PNG nền trong suốt từ Enka Network:
     `https://enka.network/ui/UI_AvatarIcon_[Name].png`
2. **Ảnh Vũ Khí (Weapon Icon)**:
   - Sử dụng icon chính thức từ Genshin Assets / Enka:
     `https://enka.network/ui/UI_EquipIcon_[WeaponName].png`
3. **Ảnh Nguyên Liệu (Boss, Sách Thiên Phú, Đá Đột Phá, Đặc Sản)**:
   - Lấy từ mapping chuẩn trong `src/utils/materialIcons.ts` hoặc Enka Network Item Icons (`https://enka.network/ui/UI_ItemIcon_[Id].png`).
4. **Quy chuẩn hiển thị trên giao diện**:
   - Khung ảnh luôn có bo góc (`rounded-xl` hoặc `rounded-2xl`), viền sáng nhẹ (`border border-white/[0.1]`), nền tối (`bg-black/30`).
   - Tối ưu tải ảnh: luôn đính kèm thuộc tính `loading="lazy"` và `decoding="async"`.
   - Luôn có ảnh đại diện trực quan thay vì chỉ để tên chữ trần hoặc icon tượng trưng rỗng.
