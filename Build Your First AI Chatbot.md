# Build Your First AI Chatbot with Python

Workshop thực hành xây dựng Chatbot AI bằng **Python**, **Flask** và **OpenAI API**.

---

# 🎯 Mục tiêu

Sau khi hoàn thành workshop, sinh viên có thể:

* Hiểu kiến trúc của một AI Chatbot
* Hiểu cách giao tiếp với OpenAI API
* Xây dựng chatbot AI bằng Python
* Thiết kế Prompt cho các mục đích khác nhau
* Triển khai và demo chatbot hoàn chỉnh

---

# 🛠 Công nghệ sử dụng

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Python
* Flask

## AI Service

* OpenAI API
* GPT Model

---

# 🏗 Kiến trúc hệ thống

```text
User
 ↓
Frontend (HTML/CSS/JS)
 ↓
Flask Server
 ↓
OpenAI API
 ↓
GPT Model
 ↓
Response
 ↓
User
```

---

# ✨ Chức năng hiện có

## 1. Gửi tin nhắn

Người dùng nhập nội dung và gửi tới chatbot.

Ví dụ:

```text
Hello AI
```

---

## 2. Nhận phản hồi từ AI

Chatbot sử dụng OpenAI API để tạo câu trả lời.

Ví dụ:

```text
User:
What is ReactJS?

AI:
ReactJS is a JavaScript library for building user interfaces.
```

---

## 3. Hiển thị hội thoại

Hiển thị:

* Tin nhắn người dùng
* Tin nhắn AI

trên giao diện web.

---

# 📁 Cấu trúc thư mục

```text
ai-chatbot-python
│
├── app.py
├── requirements.txt
├── .env
│
├── templates
│   └── index.html
│
└── static
    ├── style.css
    └── app.js
```

---

# 🚀 Cài đặt dự án

## Bước 1: Tạo môi trường ảo

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python -m venv venv
source venv/bin/activate
```

---

## Bước 2: Cài đặt thư viện

```bash
pip install -r requirements.txt
```

---

## Bước 3: Tạo file .env

```env
OPENAI_API_KEY=AIzaSyAWIKV8Ofw4y4tMQ9_CZbJyojLbuZEAZEg
```

---

## Bước 4: Chạy ứng dụng

```bash
python app.py
```

---

## Bước 5: Mở trình duyệt

```text
http://localhost:5000
```

---

# 📦 Thư viện sử dụng

requirements.txt

```text
flask
openai
python-dotenv
```

---

# 📚 Giải thích các thành phần

## app.py

Nhiệm vụ:

* Khởi tạo Flask
* Tạo API endpoint `/chat`
* Gọi OpenAI API
* Trả dữ liệu về frontend

---

## index.html

Nhiệm vụ:

* Hiển thị giao diện chatbot
* Ô nhập tin nhắn
* Nút gửi

---

## style.css

Nhiệm vụ:

* Thiết kế giao diện
* Định dạng khung chat

---

## app.js

Nhiệm vụ:

* Gửi request tới Flask
* Hiển thị phản hồi của AI

---

# 🧠 Prompt Engineering

Prompt là hướng dẫn dành cho AI.

Ví dụ:

```text
You are an English teacher.
```

---

Ví dụ:

```text
You are a travel consultant.
```

---

Ví dụ:

```text
You are a ReactJS mentor.
```

---

# 📋 Yêu cầu Workshop

Mỗi nhóm cần xây dựng một chatbot AI theo chủ đề riêng.

---

# ✅ Yêu cầu bắt buộc

## 1. Chatbot hoạt động

Người dùng gửi tin nhắn.

AI trả lời thành công.

---

## 2. Đặt tên chatbot

Ví dụ:

* English Coach AI
* Travel Advisor AI
* Study Assistant AI
* React Mentor AI

---

## 3. Thiết kế Prompt riêng

Ví dụ:

```text
You are a helpful English teacher.
Help students improve grammar and speaking skills.
Always answer clearly and provide examples.
```

---

## 4. Trả lời đúng chủ đề

Ví dụ:

Nếu chatbot là tư vấn du lịch thì không nên trả lời như giáo viên tiếng Anh.

---

## 5. Giao diện cơ bản

Tùy chỉnh:

* Tiêu đề
* Màu sắc
* Logo
* Bố cục

---

# 🚀 Bài tập mở rộng

## Mức 1

Gửi tin nhắn bằng phím Enter.

---

## Mức 2

Hiển thị:

```text
AI is typing...
```

trong lúc chờ phản hồi.

---

## Mức 3

Tự động cuộn xuống cuối hội thoại.

---

## Mức 4

Lưu lịch sử hội thoại.

Gợi ý:

```python
messages = []
```

Lưu các tin nhắn trước đó để AI có thể nhớ ngữ cảnh.

---

## Mức 5

Dark Mode.

---

## Mức 6

Hiển thị thời gian gửi tin nhắn.

---

## Mức 7

Nút:

```text
Clear Chat
```

để xóa toàn bộ cuộc trò chuyện.

---

# 💡 Chủ đề gợi ý

## English Learning Assistant

Hỗ trợ học tiếng Anh.

---

## Travel Advisor

Tư vấn du lịch.

---

## ReactJS Mentor

Hướng dẫn ReactJS.

---

## Study Assistant

Hỗ trợ học tập.

---

## Customer Support Bot

Hỗ trợ khách hàng.

---

## Admission Consultant

Tư vấn tuyển sinh.

---

# 🏆 Tiêu chí đánh giá

| Tiêu chí            | Điểm |
| ------------------- | ---- |
| Chatbot hoạt động   | 3    |
| Prompt phù hợp      | 2    |
| Trả lời đúng chủ đề | 2    |
| Giao diện           | 1    |
| Sáng tạo            | 2    |

Tổng điểm: 10

---

# 🎤 Demo cuối buổi

Mỗi nhóm có:

* 2 phút giới thiệu sản phẩm
* 1 phút demo

Trình bày:

1. Tên chatbot
2. Mục tiêu sử dụng
3. Prompt sử dụng
4. Demo thực tế

---

# 📈 Hướng phát triển sau Workshop

* Conversation Memory
* Chat with PDF
* RAG (Retrieval-Augmented Generation)
* LangChain
* AI Agent
* Multi-Agent System
* Voice Assistant
* MCP Server

---

# 🎓 Kết luận

Hoàn thành workshop này đồng nghĩa với việc bạn đã xây dựng thành công ứng dụng AI đầu tiên bằng Python.

Đây là nền tảng quan trọng để tiếp tục học:

* Generative AI
* LLM Engineering
* RAG
* AI Agent
* Machine Learning Applications

Chúc các bạn xây dựng được những chatbot AI sáng tạo và hữu ích!
