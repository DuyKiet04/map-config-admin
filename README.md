# Bài 4: Trang Cấu Hình Bản Đồ

Project SvelteKit này xây dựng một trang admin (Map Configuration Page) cho phép quản trị viên chỉnh sửa cấu hình bản đồ (JSON) và lưu trữ trên MinIO.

Nó cũng cung cấp một API công khai `GET /api/config` để các ứng dụng bản đồ (như Bài 1-3) có thể đọc cấu hình này.

## Deadline dự kiến

- Thời gian hoàn thành: 25/11/2025

## Link Demo (Netlify)

- **Trang Admin:** [cập nhật sau]/admin
- **API Endpoint:** [cập nhật sau]/api/config

---

## Cách Cài Đặt và Chạy

### 1. Cài đặt

Clone repository và cài đặt dependencies:

```bash
git clone [https://github.com/DuyKiet04/map-config-admin.git]
cd map-config-admin
npm install
```

### 2. Cấu hình MinIO (Environment)

Project này được cấu hình để chạy với MinIO Playground. Bạn cần tạo một file `.env` ở thư mục gốc và điền các thông tin sau:

```ini
# .env
# API Endpoint (no port 9443)
S3_ENDPOINT="[https://play.min.io](https://play.min.io)"

S3_ACCESS_KEY="minioadmin"
S3_SECRET_KEY="minioadmin"

# Dùng bucket 'test' (vì 'sveltekitthesis' không ổn định)
S3_BUCKET="test"
S3_KEY="configs/map-config.json"
```

### 3. Chạy Local

Sau khi cài đặt và cấu hình `.env`, chạy server dev:

```bash
npm run dev
```

- Truy cập trang Admin: `http://localhost:5173/admin`
- Truy cập API: `http://localhost:5173/api/config`
