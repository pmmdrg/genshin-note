# Genshin Note • Task Timeline & Priority Stack

Ứng dụng web cá nhân định hướng và sắp xếp thứ tự ưu tiên các mục tiêu bồi dưỡng trong **Genshin Impact** theo mô hình **Timeline & Ngăn Xếp (Stack LIFO)**.

> 📖 **Quy chuẩn & Chỉ dẫn phát triển**: Xem tài liệu hướng dẫn và ngữ cảnh dự án tại [**`docs/GUIDELINES.md`**](./docs/GUIDELINES.md).

---

## 🌟 Tính Năng Nổi Bật

1. **Ngăn Xếp Ưu Tiên (Stack LIFO) & Timeline Trực Quan**:
   - Khi thêm bất kỳ mục tiêu mới (ví dụ: *Build Furina*, *Đột phá Tây Phong Kiếm*), mục tiêu đó sẽ **tự động được đẩy lên ĐỈNH Stack (Ưu tiên #1)**.
   - Hỗ trợ **Kéo - Thả (Drag & Drop)** mượt mà bằng `@dnd-kit` để điều chỉnh lại thứ tự ưu tiên bất cứ khi nào bạn muốn.
   - Nhấp vào nút **"Xong"** (hoàn thành) sẽ kích hoạt hiệu ứng pháo hoa (Confetti) và tự động chuyển mục tiêu sang kho lưu trữ **"Đã Hoàn Thành"** để giữ timeline luôn gọn gàng.
   - Có thể khôi phục lại các mục tiêu đã xong bất kỳ lúc nào.

2. **Huy Hiệu Trạng Thái Thông Minh (Smart Badges)**:
   - Tự động kiểm tra thời gian máy chủ Genshin (tính cả mốc reset lúc 04:00 AM hàng ngày).
   - Tự động hiển thị huy hiệu:
     - 🟢 **Bí cảnh mở hôm nay!** (Nếu sách thiên phú / nguyên liệu vũ khí đang mở đúng thứ trong tuần).
     - ⏳ **Mở vào [T3, T6, CN]** (Nếu hôm nay bí cảnh đang đóng).
     - 💧 **Chi phí nhựa ước tính** (20, 30, 40 nhựa mỗi lượt).

3. **Theo Dõi Nhựa & Nhiệm Vụ Hằng Ngày (Resin & Dailies Tracker)**:
   - Bộ đếm nhựa theo thời gian thực (1 nhựa / 8 phút, giới hạn 200).
   - Đếm ngược chính xác thời gian đầy nhựa và cảnh báo khi nhựa sắp tràn ($\ge 170$).
   - Nút tiêu nhanh: `-20` (Bí cảnh/Nhựa cô đặc), `-40` (Boss), `-30` (Boss tuần), `+60` (Nhựa dễ vỡ).
   - Checklist 4 Ủy thác ngày và 3 Boss tuần giảm nửa nhựa.

4. **Tích Hợp HoYoLAB API Qua Vercel Serverless**:
   - Tích hợp sẵn hàm `api/dailyNote.ts` chạy trên **Vercel Serverless Functions**.
   - Vượt qua kiểm duyệt CORS của trình duyệt, kết nối trực tiếp đến HoYoLAB Daily Note để đồng bộ tự động số nhựa và ủy thác.
   - Lưu trữ cục bộ trên thiết bị của bạn bằng `LocalStorage` thông qua `Zustand` (hoàn toàn riêng tư, an toàn, không chia sẻ với bất kỳ ai).

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local)

```bash
# 1. Cài đặt dependencies (đã cài sẵn)
npm install

# 2. Khởi động môi trường phát triển
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

---

## ☁️ Hướng Dẫn Deploy Lên Vercel

Dự án đã được cấu hình sẵn file [vercel.json](file:///c:/Personal/GenshinImpact/vercel.json) và thư mục [api/](file:///c:/Personal/GenshinImpact/api) để deploy 1-click lên Vercel:

1. Đẩy dự án lên GitHub cá nhân của bạn (chế độ **Private Repository**).
2. Đăng nhập vào [vercel.com](https://vercel.com) $\rightarrow$ chọn **Add New Project** $\rightarrow$ chọn Repository vừa tạo.
3. Trong phần **Environment Variables** (Tùy chọn nếu muốn đồng bộ HoYoLAB):
   - Thêm biến: `HOYOLAB_COOKIE` = `ltuid_v2=...; ltoken_v2=...;`
4. Bấm **Deploy**.
