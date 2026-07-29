@echo off
:: Setup script for AI Chatbot Project
:: Developed for Students

chcp 65001 > nul
title Cài đặt dự án AI Chatbot

echo =======================================================
echo     HỆ THỐNG CÀI ĐẶT TỰ ĐỘNG - AI CHATBOT WORKSHOP
echo =======================================================
echo.

:: 1. Kiểm tra Python đã cài đặt chưa
python --version >nul 2>&1
if errorlevel 1 (
    echo [LỖI] Không tìm thấy Python trên hệ thống của bạn!
    echo Vui lòng tải và cài đặt Python từ: https://www.python.org/downloads/
    echo Lưu ý: Hãy tích chọn "Add Python to PATH" khi cài đặt.
    echo.
    pause
    exit /b
)

:: 2. Khởi tạo môi trường ảo venv nếu chưa có
if not exist venv (
    echo [1/4] Đang khởi tạo môi trường ảo Python (venv)...
    python -m venv venv
    if errorlevel 1 (
        echo [LỖI] Không thể tạo thư mục venv.
        pause
        exit /b
    )
    echo [OK] Đã tạo thành công thư mục venv.
) else (
    echo [1/4] Thư mục venv đã tồn tại. Bỏ qua bước tạo mới.
)
echo.

:: 3. Tạo file cấu hình .env nếu chưa có
if not exist .env (
    echo [2/4] Đang tạo file cấu hình .env từ .env.example...
    copy .env.example .env
    echo [OK] Đã tạo file .env. Hãy nhớ mở file .env lên và điền API Key của bạn vào nhé!
) else (
    echo [2/4] File cấu hình .env đã tồn tại.
)
echo.

:: 4. Kích hoạt venv và cài đặt thư viện
echo [3/4] Đang kích hoạt môi trường ảo và cài đặt thư viện...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo [LỖI] Quá trình cài đặt thư viện gặp lỗi. Vui lòng kiểm tra kết nối mạng của bạn.
    pause
    exit /b
)
echo [OK] Cài đặt các thư viện thành công.
echo.

:: 5. Hoàn tất và chạy thử ứng dụng
echo [4/4] Quá trình chuẩn bị đã hoàn tất!
echo =======================================================
echo.
set /p choice="Bạn có muốn khởi chạy ứng dụng Chatbot ngay bây giờ không? (Y/N): "
if /i "%choice%"=="Y" (
    echo Đang chạy ứng dụng app.py...
    echo Vui lòng mở trình duyệt và truy cập: http://127.0.0.1:5000
    python app.py
) else (
    echo.
    echo Bạn có thể khởi chạy ứng dụng sau bằng cách mở Command Prompt, chạy:
    echo     venv\Scripts\activate
    echo     python app.py
    echo.
    pause
)
