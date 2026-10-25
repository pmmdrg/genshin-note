# Genshin Note • Hướng Dẫn & Quy Chuẩn Dự Án (Project Guidelines)

> **MỤC ĐÍCH**: Đây là file kim chỉ nam của toàn bộ dự án. Khi thực hiện **bất kỳ tác vụ nào**, trợ lý AI bắt buộc phải đọc qua tài liệu này và các file liên quan trong thư mục `docs/` để nắm rõ bối cảnh, quy tắc thiết kế và nghiệp vụ trước khi tiến hành code.

---

## 📌 Bảng Điều Hướng Tài Liệu Chi Tiết

| Tài Liệu | Nội Dung Chính |
| :--- | :--- |
| [**`DESIGN_SYSTEM.md`**](./DESIGN_SYSTEM.md) | Phong cách **Liquid Glass**, quy tắc dùng Icon, quy chuẩn câu từ/text tối giản, chuẩn hình ảnh tài nguyên. |
| [**`DOMAIN_RULES.md`**](./DOMAIN_RULES.md) | Quy tắc nghiệp vụ chi tiết: Lịch Sử Cầu Nguyện 5★, Lịch Hoạt Động & Phiên Bản 7.x, Quản lý Nhân Vật & Nhựa. |
| [**`WORKFLOW_RULES.md`**](./WORKFLOW_RULES.md) | Quy trình làm việc: Kiểm tra Lint & Build, tự động Git Commit & Push, cập nhật tài liệu khi có thay đổi. |

---

## ⚡ 4 Quy Tắc Cốt Lõi Bắt Buộc Tuân Thủ

### 1. Phong Cách Thiết Kế: Liquid Glass
- Tất cả giao diện tuân theo ngôn ngữ **Liquid Glass**: lớp nền kính mờ (`liquid-glass`, `liquid-glass-subtle`, `backdrop-blur`), đường viền mảnh tinh tế (`border-white/[0.06]` hoặc `border-white/[0.08]`), hiệu ứng đổ bóng & gradient phát sáng nhẹ nhàng.
- Giữ giao diện hiện đại, sạch sẽ, chuẩn aesthetic game Genshin Impact.

### 2. Tiết Chế Icon – Hạn Chế Dùng Bừa Bãi
- **Tuyệt đối không nhồi nhét icon dư thừa** vào mọi tiêu đề, nhãn hoặc dòng text.
- Chỉ dùng icon ở các vị trí thật sự cần thiết (Menu điều hướng chính, nút thao tác hành động rõ ràng, hoặc trạng thái trực quan đặc thù).
- Không lặp lại cùng một icon nhiều lần trong cùng một khối thông tin hẹp.

### 3. Tối Giản Câu Từ – Bỏ Text Lặp Lại & Thừa Thãi
- **Ưu tiên dữ liệu trực tiếp**: Hiển thị con số, thời gian, tên gọi cụ thể thay vì viết các đoạn mô tả dài dòng, rườm rà.
- Không lặp lại thông tin (ví dụ: nếu card con bên dưới đã có ngày giờ bắt đầu/kết thúc thì thanh header bên trên không lặp lại đoạn text đó).
- Loại bỏ văn phong hoa mỹ, các đoạn chú thích sáo rỗng hoặc boilerplate không mang lại giá trị sử dụng.

### 4. Ưu Tiên Tối Đa Hình Ảnh Trực Quan
- **Luôn ưu tiên hiển thị avatar/ảnh chính thức** của nhân vật, vũ khí, nguyên liệu đột phá (lấy từ Enka Network CDN, HoYoverse CDN hoặc assets nội bộ).
- Tránh để ô vuông chỉ chứa chữ thuần túy hoặc icon trừu tượng khi có thể lấy được hình ảnh đồ họa thực tế của vật phẩm.

---

## 🛠️ Checklist Bắt Buộc Trước & Sau Khi Thực Hiện Yêu Cầu

- [ ] **Trước khi code**: Đọc lại `docs/GUIDELINES.md`, `docs/DESIGN_SYSTEM.md`, `docs/DOMAIN_RULES.md` để nắm đúng context.
- [ ] **Trong khi code**:
  - Giữ style `liquid-glass`, không phá vỡ bố cục responsive.
  - Sử dụng Tailwind CSS chuẩn. Tránh dùng `transition-all` trên các thẻ con nằm trong grid có FLIP animation (`@formkit/auto-animate`), thay bằng `transition-colors duration-200`.
- [ ] **Sau khi code**:
  - Chạy `cmd.exe /c "npm run lint"` (đảm bảo 0 lỗi).
  - Chạy `cmd.exe /c "npm run build"` (đảm bảo build Vite & TypeScript thành công 100%).
  - Tự động `git add`, `git commit -m '...'` và `git push origin main`.
  - Cập nhật lại các file tài liệu trong `docs/` nếu có yêu cầu hoặc điều chỉnh mới từ người dùng.
