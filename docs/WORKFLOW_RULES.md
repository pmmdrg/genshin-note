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

### Bước 2: Thực Hiện Code Chuẩn Mực & Tối Ưu Cấu Trúc
- **TypeScript**: Sử dụng kiểu dữ liệu rõ ràng, đầy đủ interface. Khi import type độc lập, dùng cú pháp `import type { ... }` để tương thích với `verbatimModuleSyntax`.
- **Tránh xung đột Animation**: Nếu container sử dụng `@formkit/auto-animate`, các phần tử con **không** được dùng `transition-all` (sẽ gây xung đột với transform của Web Animations API dẫn đến giật/rung). Luôn dùng `transition-colors duration-200` cho hover màu sắc.
- **Tối ưu hình ảnh**: Tất cả thẻ ảnh `<img>` dùng lazy loading (`loading="lazy" decoding="async"`).
- **Tối ưu cấu trúc & dọn dẹp tức thì**: Tách bạch logic nghiệp vụ ra khỏi JSX; dọn dẹp ngay các import, biến và hàm không còn dùng sau khi chỉnh sửa.

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

---

## 🧹 2. Tiêu Chuẩn Clean Code & Dọn Dẹp Code Thừa (Dead Code Elimination)

> **Yêu cầu cốt lõi**: *"Luôn tối ưu cấu trúc code và dọn dẹp các code không cần nữa để giữ clean code và dễ mở rộng sau này"*.

### A. Dọn Dẹp Code Thừa (Dead Code Elimination)
1. **Xóa triệt để code không sử dụng**:
   - Khi xóa bỏ hoặc thay đổi một tính năng (ví dụ: gỡ bỏ các card thống kê thừa, xóa bỏ tính năng không cần thiết), phải lập tức kiểm tra và xóa toàn bộ các biến, state, helper function, interface và import liên quan.
   - Tuyệt đối không để lại code "chết" (unreachable code) hoặc các file mồ côi (orphaned files) trong dự án.
2. **Không để lại code bị comment-out**:
   - Nếu một khối code không còn cần thiết, hãy xóa hẳn nó đi. Lịch sử Git luôn lưu trữ lại các commit cũ khi cần tra cứu, không dùng comment để lưu code rác.
3. **Kiểm tra import thừa thường xuyên**:
   - Luôn dọn dẹp các import icon từ `lucide-react`, các hàm từ `utils/` hay các kiểu type không còn được gọi trong JSX.

### B. Tối Ưu Cấu Trúc Code & Khả Năng Mở Rộng (Scalability)
1. **Phân tách trách nhiệm rõ ràng (Separation of Concerns)**:
   - **`components/`**: Chỉ đảm nhận render giao diện hiển thị và bắt sự kiện tương tác của người dùng.
   - **`data/` & `utils/`**: Chứa hằng số cấu hình, danh sách dữ liệu tĩnh và các thuật toán tính toán nghiệp vụ (tính pity, chu kỳ phiên bản, chi phí nhựa).
   - **`store/`**: Quản lý state toàn cục và persistence (`localStorage`).
   - **`hooks/`**: Chứa các custom hook dùng chung (như `useDebounce`).
2. **Thiết kế hướng dữ liệu (Data-Driven Architecture)**:
   - Tránh hardcode các danh sách, phiên bản hoặc cấu hình tĩnh trực tiếp trong component JSX.
   - Đưa dữ liệu vào mảng/object trong thư mục `src/data/`, giúp việc mở rộng thêm nhân vật mới, phiên bản mới hay banner mới chỉ cần bổ sung 1 dòng config mà không phải viết lại giao diện.
3. **Giữ Component Tinh Gọn**:
   - Tránh để file component phình to vượt quá 400-500 dòng. Khi một khối giao diện có logic độc lập, hãy tách thành sub-component nhỏ hơn để dễ đọc, dễ kiểm thử và dễ bảo trì.
