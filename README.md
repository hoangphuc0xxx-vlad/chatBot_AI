# 🤖 Hướng Dẫn Triển Khai Dự Án AI Chatbot

Chào mừng các bạn sinh viên đến với Workshop thực hành xây dựng AI Chatbot! Dưới đây là hướng dẫn chi tiết từ A-Z để cài đặt và khởi chạy dự án này trên máy tính của bạn.

---

## 🛠 Cách Cài Đặt Nhanh Nhất (Dành cho Windows)

Để tạo điều kiện thuận lợi nhất, dự án đã được tích hợp sẵn file **`setup.bat`**. File này sẽ tự động hóa toàn bộ quá trình cài đặt:

1. **Bước 1**: Nhấp đúp chuột (Double click) vào file **`setup.bat`** để khởi chạy hệ thống cài đặt tự động.
2. **Bước 2**: File bat sẽ tự động kiểm tra Python, khởi tạo môi trường ảo (`venv`), sao chép cấu hình `.env` và cài đặt các thư viện cần thiết (`flask`, `openai`, `python-dotenv`).
3. **Bước 3**: Sau khi hoàn tất cài đặt, bạn sẽ được hỏi có muốn chạy ứng dụng ngay không. Nhấn `Y` để chạy ứng dụng.

---

## 🔑 Hướng Dẫn Cấu Hình API Key (Bắt Buộc)

Để chatbot có thể suy nghĩ và trả lời tin nhắn của bạn, ứng dụng cần kết nối tới mô hình AI thông qua **Gemini API Key**.

1. Mở file **`.env`** bằng bất kỳ trình soạn thảo mã nguồn nào (VS Code, Notepad, v.v.).
2. Tìm dòng chữ:
   ```env
   OPENAI_API_KEY=YOUR_GEMINI_API_KEY
   ```
3. Thay thế `YOUR_GEMINI_API_KEY` bằng API Key thật của bạn được cung cấp từ Google AI Studio (bắt đầu bằng `AIzaSy...`).
4. Lưu file lại.

*Lưu ý: Không chia sẻ công khai file `.env` hoặc API Key này lên GitHub.*

---

## 💻 Cách Cài Đặt Thủ Công (Nếu không dùng file setup.bat)

Nếu bạn sử dụng macOS/Linux hoặc muốn tự tay chạy từng câu lệnh, hãy thực hiện theo các bước sau:

### 1. Tạo môi trường ảo (Virtual Environment)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Cài đặt các thư viện
```bash
pip install -r requirements.txt
```

### 3. Tạo file cấu hình `.env`
Sao chép file `.env.example` thành `.env` và điền khóa API của bạn vào đó.

### 4. Khởi chạy ứng dụng
```bash
python app.py
```

Sau đó, truy cập đường dẫn sau trên trình duyệt Web:
👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 📁 Cấu Trúc Thư Mục Dự Án

* **`app.py`**: Mã nguồn Backend xử lý logic Server Flask và kết nối Google Gemini API.
* **`templates/index.html`**: Giao diện HTML của khung chat.
* **`static/style.css`**: Định dạng kiểu dáng, màu sắc giao diện (CSS).
* **`static/app.js`**: Nhận tin nhắn từ giao diện, gửi request tới backend và hiển thị kết quả trả về từ AI.
* **`requirements.txt`**: Danh sách thư viện Python cần cài đặt.
* **`setup.bat`**: File script tự động cài đặt nhanh trên Windows.

Chúc các bạn có một buổi thực hành Workshop thật thú vị và sáng tạo! 🚀
