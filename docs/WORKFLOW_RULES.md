# Quy Trình Phát Triển & Chuẩn Hóa Code (Development Workflow)

Tài liệu này định nghĩa các bước bắt buộc mà trợ lý AI phải tuân thủ khi nhận bất kỳ yêu cầu mới nào từ người dùng, từ lúc tiếp nhận, code, kiểm thử cho đến khi commit và push lên repository.

---

## 🔄 1. Quy Trình 5 Bước Cho Mọi Yêu Cầu Mới

```
[1. Đọc Context docs/] ──> [2. Thực hiện Code] ──> [3. Lint & Build] ──> [4. Git Commit & Push] ──> [5. Cập nhật Docs]
```

### Bước 1: Đọc lại Context & Chỉ Dẫn
- Đọc qua `docs/GUIDELINES.md`, `docs/DESIGN_SYSTEM.md` và `docs/DOMAIN_RULES.md` để nắm rõ ràng buộc hiện tại.
- Xác định xem yêu cầu mới có liên quan đến style **Liquid Glass**, quy tắc **tiết chế icon**, chuẩn **câu từ ngắn gọn**, hay **quy tắc tính toán** nào không.

### Bước 2: Thực Hiện Code Chuẩn Mực
- **TypeScript**: Sử dụng kiểu dữ liệu rõ ràng, đầy đủ interface. Khi import type độc lập, dùng cú pháp `import type { ... }` để tương thích với `verbatimModuleSyntax`.
- **Tránh xung đột Animation**: Nếu container sử dụng `@formkit/auto-animate`, các phần tử con **không** được dùng `transition-all` (sẽ gây xung đột với transform của Web Animations API dẫn đến giật/rung). Luôn dùng `transition-colors duration-200` cho hover màu sắc.
- **Tối ưu hình ảnh**: Tất cả thẻ ảnh `<img>` dùng lazy loading (`loading="lazy" decoding="async"`).

### Bước 3: Kiểm Thử Lint & Build Bắt Buộc
Trước khi thông báo hoàn thành hoặc commit, phải chạy qua 2 lệnh kiểm tra trong Windows terminal:
```powershell
cmd.exe /c "npm run lint"
cmd.exe /c "npm run build"
```
- Phải đảm bảo **0 lỗi Lint** và **Vite build thành công 100%**.

### Bước 4: Tự Động Commit & Push Lên GitHub (`main`)
- **Yêu cầu của người dùng**: Người dùng muốn code sau khi làm xong phải luôn được commit và đẩy lên GitHub.
- Thực hiện:
```powershell
git add <các file đã sửa>
git commit -m '<loại commit>(<phạm vi>): mô tả ngắn gọn thay đổi'
git push origin main
```
*(Lưu ý trên PowerShell: Luôn bọc commit message bằng dấu nháy đơn `'...'` để tránh lỗi phân tích cú pháp của shell).*

### Bước 5: Cập Nhật Tài Liệu `docs/` Khi Có Thay Đổi
- Nếu người dùng bổ sung quy tắc mới, thay đổi thiết kế hoặc thêm nghiệp vụ mới, **ngay lập tức cập nhật tài liệu tương ứng trong thư mục `docs/`** để mọi lượt trao đổi tiếp theo luôn đồng bộ ngữ cảnh hoàn hảo.
