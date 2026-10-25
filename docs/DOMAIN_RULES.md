# Quy Tắc Nghiệp Vụ Dự Án (Domain & Business Rules)

Tài liệu này tổng hợp toàn bộ các quy tắc nghiệp vụ, công thức tính toán và ràng buộc logic trong từng tính năng của Genshin Note.

---

## 🎯 1. Lịch Hoạt Động & Phiên Bản (Version Schedule)

- **Giai đoạn phiên bản hiện tại**: **Giai đoạn 7.x**. Phiên bản kế tiếp bắt đầu là **7.2**.
- **Lộ trình 5 phiên bản kế tiếp**:
  1. **v7.2**: Bắt đầu Thứ Tư, 04/11/2026 (Phase 2: Thứ Ba, 24/11/2026 lúc 17:00).
  2. **v7.3**: Bắt đầu Thứ Tư, 16/12/2026 (Phase 2: Thứ Ba, 05/01/2027 lúc 17:00).
  3. **v7.4**: Bắt đầu Thứ Tư, 27/01/2027 (Phase 2: Thứ Ba, 16/02/2027 lúc 17:00).
  4. **v7.5**: Bắt đầu Thứ Tư, 10/03/2027 (Phase 2: Thứ Ba, 30/03/2027 lúc 17:00).
  5. **v7.6**: Bắt đầu Thứ Tư, 21/04/2027 (Phase 2: Thứ Ba, 11/05/2027 lúc 17:00).
- **Quy tắc chu kỳ phiên bản**:
  - Chu kỳ chuẩn: **42 ngày (6 tuần)**.
  - Ngày ra mắt phiên bản mới: Luôn là sáng **Thứ Tư** lúc **10:00** (sau bảo trì máy chủ từ 05:00 - 10:00).
  - Phân chia 2 Phase:
    - **Phase 1**: Thứ Tư (10:00) ➔ Thứ Ba (17:00) tuần thứ 3 (20 ngày).
    - **Phase 2**: Bắt đầu chính xác vào **chiều Thứ Ba lúc 17:00** ➔ Thứ Tư (06:00) ngày bảo trì tiếp theo (21 ngày).
- **Yêu cầu giao diện**:
  - Tối giản, trực quan, loại bỏ các thẻ thống kê rườm rà không cần thiết.
  - Mỗi phiên bản chỉ gồm ngày giờ bắt đầu/kết thúc cụ thể của 2 Phase và ô ghi chú kế hoạch cá nhân.

---

## 🔮 2. Lịch Sử Cầu Nguyện (Wish Tracker)

- **Chỉ theo dõi vật phẩm 5★**:
  - **Tuyệt đối không đưa 4★** (nhân vật 4★ hoặc vũ khí 4★) vào cơ sở dữ liệu hay giao diện thống kê nổ vàng.
  - Nút "Thêm 5★" ở mỗi tab chỉ đặt 1 nút ở phần bên dưới (danh sách lịch sử), không để thừa ở phần tính pity phía trên.
- **Quy tắc tính Tỷ Lệ Trúng / Lệch (50/50)**:
  - **Trúng rate 50/50**: Chỉ tính lần thắng 50/50 tự nhiên + lần kích hoạt **Bắt Lấy Ánh Sáng** (Capturing Radiance từ bản 5.0+).
  - **Lệch rate**: Số lần ra nhân vật/vũ khí lệch chuẩn.
  - **Trúng nhờ Bảo Hiểm**: Sau khi đã lệch thì lần nổ kế tiếp chắc chắn trúng rate nhờ cơ chế bảo hiểm $\rightarrow$ **Không tính vào tỷ lệ 50/50**, và **không cần hiển thị dòng chữ giải thích rườm rà**.
  - Nếu một nhân vật/vũ khí đã có badge `Bảo Hiểm` thì không gắn thêm badge `Trúng Rate`.
- **Huy hiệu Tổng Roll & Nguyên Thạch ở Tiêu Đề**:
  - **Chỉ tính trên 3 banner giới hạn**: Nhân Vật, Vũ Khí, Sử Ký.
  - **Loại trừ hoàn toàn banner Thường** (vì banner Thường dùng vé xanh Mối Duyên Tương Ngộ được tặng miễn phí, không phản ánh số Nguyên Thạch người chơi bỏ ra để quay).
  - **Công thức**:
    $$\text{Tổng Roll} = \sum (\text{Pity của các 5★ trong lịch sử 3 banner}) + \sum (\text{Pity hiện tại đang tích lũy của 3 banner})$$
    $$\text{Nguyên Thạch} = \text{Tổng Roll} \times 160$$
  - Hiển thị: `{tổng_roll} roll ({tổng_nguyên_thạch} Nguyên Thạch)`.
- **Hiệu ứng tìm kiếm & lọc**:
  - Debounce 150ms khi nhập từ khóa. Hỗ trợ tìm tiếng Việt có dấu, không dấu, viết liền và alias tên tiếng Anh/Việt thông dụng.
  - Sử dụng `@formkit/auto-animate` (FLIP animation) để các ô vật phẩm trượt mượt mà về vị trí mới, tự fade & scale khi ẩn/hiện, không bị nhảy giật vị trí.

---

## ⚔️ 3. Danh Sách Nhân Vật & Cây Tiến Trình (Roster & Branch Trees)

- **Ngăn xếp ưu tiên (Stack LIFO)**:
  - Khi người dùng thêm một mục tiêu mới (nhân vật, vũ khí), mục tiêu đó tự động được đẩy lên đỉnh ngăn xếp (Ưu tiên #1).
  - Hỗ trợ kéo - thả tự do (`@dnd-kit`) để sắp xếp lại ưu tiên bất kỳ lúc nào.
- **Tính toán tài nguyên chính xác**:
  - Tính toán sách EXP (Kinh Nghiệm Anh Hùng), Mora, Boss thế giới, đặc sản khu vực theo cấp độ từ level hiện tại lên level 90.
  - Tính toán sách thiên phú (1 ➔ 10), nguyên liệu quái và Crown (Vương Miện Trí Thức).
  - Kiểm tra lịch mở bí cảnh theo ngày trong tuần của máy chủ Genshin (chủ nhật mở tất cả).

---

## ⏳ 4. Nhựa Nguyên Bản & Nhiệm Vụ Hằng Ngày (Resin & Dailies)

- Giới hạn Nhựa: **200**. Tốc độ hồi: 1 nhựa / 8 phút (480 giây). Cảnh báo nguy cơ tràn nhựa khi $\ge 170$.
- Thời gian reset máy chủ: **04:00 AM** theo giờ máy chủ Asia (UTC+8).
- Hỗ trợ đồng bộ tự động dữ liệu Daily Note từ HoYoLAB thông qua hàm Serverless proxy `/api/dailyNote.ts`.
- Mọi dữ liệu cá nhân được lưu trữ an toàn trong `localStorage` thông qua `Zustand Persist`.
