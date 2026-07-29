document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");
    const clearBtn = document.getElementById("clear-btn");
    const sendBtn = document.getElementById("send-btn");
    const attachBtn = document.getElementById("attach-btn");
    const fileInput = document.getElementById("file-input");
    const attachmentPreview = document.getElementById("attachment-preview");
    const attachmentName = document.getElementById("attachment-name");
    const attachmentSize = document.getElementById("attachment-size");
    const removeFileBtn = document.getElementById("remove-file-btn");
    const micBtn = document.getElementById("mic-btn");
    const inputHint = document.getElementById("input-hint");
    const suggestionButtons = document.querySelectorAll(".suggestion-chip");

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let conversationHistory = [];
    let selectedFile = null;
    let isSending = false;
    let isListening = false;
    let recognition = null;
    let speechBaseText = "";
    let speechHadError = false;

    function getCurrentTime() {
        return new Intl.DateTimeFormat("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date());
    }

    function escapeHtml(text) {
        const element = document.createElement("div");
        element.textContent = text;
        return element.innerHTML;
    }

    function formatMessage(text) {
        return escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendMessage(sender, text, isSystem = false, filename = "") {
        const message = document.createElement("div");
        message.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;

        if (sender !== "user") {
            const label = document.createElement("div");
            label.className = "message-label";
            label.textContent = isSystem ? "Hệ thống" : "Bạn thông thái";
            message.appendChild(label);
        }

        const content = document.createElement("div");
        content.className = "message-content";
        const fileLabel = filename ? `<span class="message-file">📎 ${escapeHtml(filename)}</span>` : "";
        content.innerHTML = `${fileLabel}${formatMessage(text)}`;

        const time = document.createElement("div");
        time.className = "message-time";
        time.textContent = getCurrentTime();

        message.append(content, time);
        chatMessages.appendChild(message);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.id = "typing-indicator";
        indicator.className = "message bot-message";
        indicator.innerHTML = `
            <div class="message-label">Bạn thông thái</div>
            <div class="message-content">
                <div class="typing-indicator" aria-label="Trợ lý đang trả lời">
                    <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
                </div>
            </div>`;
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        document.getElementById("typing-indicator")?.remove();
    }

    function setSendingState(sending) {
        isSending = sending;
        sendBtn.disabled = sending;
        userInput.disabled = sending;
        attachBtn.disabled = sending;
        micBtn.disabled = sending || !SpeechRecognition;
    }

    function resizeInput() {
        userInput.style.height = "auto";
        userInput.style.height = `${Math.min(userInput.scrollHeight, 120)}px`;
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function clearSelectedFile() {
        selectedFile = null;
        fileInput.value = "";
        attachmentPreview.hidden = true;
        attachmentName.textContent = "";
        attachmentSize.textContent = "";
    }

    function showInputNotice(message, resetAfter = 3500) {
        const original = "Enter để gửi · Shift + Enter để xuống dòng · File tối đa 10 MB";
        inputHint.textContent = message;
        inputHint.classList.add("is-notice");
        window.setTimeout(() => {
            inputHint.textContent = original;
            inputHint.classList.remove("is-notice");
        }, resetAfter);
    }

    async function sendMessage() {
        const messageText = userInput.value.trim();
        if ((!messageText && !selectedFile) || isSending) return;

        const fileToSend = selectedFile;
        const displayText = messageText || "Hãy đọc và tóm tắt file này giúp mình.";
        userInput.value = "";
        resizeInput();
        clearSelectedFile();
        appendMessage("user", displayText, false, fileToSend?.name || "");
        showTypingIndicator();
        setSendingState(true);

        try {
            const formData = new FormData();
            formData.append("message", messageText);
            formData.append("history", JSON.stringify(conversationHistory));
            if (fileToSend) formData.append("file", fileToSend);

            const response = await fetch("/chat", { method: "POST", body: formData });
            const data = await response.json();
            removeTypingIndicator();

            if (response.ok && data.reply) {
                conversationHistory.push(
                    { role: "user", content: data.history_content || displayText },
                    { role: "assistant", content: data.reply },
                );
                appendMessage("bot", data.reply);
            } else {
                appendMessage("bot", `Mình chưa thể xử lý yêu cầu. ${data.error || "Vui lòng thử lại sau."}`, true);
            }
        } catch (error) {
            removeTypingIndicator();
            appendMessage("bot", "Không thể kết nối đến máy chủ. Bạn hãy kiểm tra lại ứng dụng rồi thử lần nữa.", true);
            console.error("Chat request failed:", error);
        } finally {
            setSendingState(false);
            userInput.focus();
        }
    }

    function setupSpeechRecognition() {
        if (!SpeechRecognition) {
            micBtn.disabled = true;
            micBtn.title = "Trình duyệt này chưa hỗ trợ nhập bằng giọng nói";
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            isListening = true;
            speechHadError = false;
            speechBaseText = userInput.value.trim();
            micBtn.classList.add("is-listening");
            micBtn.setAttribute("aria-label", "Dừng nhập bằng giọng nói");
            showInputNotice("Đang nghe... Hãy nói bằng tiếng Việt.", 60_000);
        };

        recognition.onresult = (event) => {
            let transcript = "";
            for (let index = 0; index < event.results.length; index += 1) {
                transcript += event.results[index][0].transcript;
            }
            userInput.value = [speechBaseText, transcript.trim()].filter(Boolean).join(" ");
            resizeInput();
        };

        recognition.onerror = (event) => {
            speechHadError = true;
            const messages = {
                "not-allowed": "Bạn cần cho phép Chrome sử dụng micro.",
                "no-speech": "Mình chưa nghe thấy giọng nói, hãy thử lại.",
                network: "Không thể kết nối dịch vụ nhận dạng giọng nói.",
            };
            showInputNotice(messages[event.error] || "Không thể nhận dạng giọng nói.");
        };

        recognition.onend = () => {
            isListening = false;
            micBtn.classList.remove("is-listening");
            micBtn.setAttribute("aria-label", "Bắt đầu nhập bằng giọng nói");
            if (!speechHadError) {
                inputHint.textContent = "Enter để gửi · Shift + Enter để xuống dòng · File tối đa 10 MB";
                inputHint.classList.remove("is-notice");
            }
        };
    }

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage();
    });

    userInput.addEventListener("input", resizeInput);
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            sendMessage();
        }
    });

    attachBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;
        if (file.size > MAX_FILE_SIZE) {
            clearSelectedFile();
            showInputNotice("File vượt quá dung lượng tối đa 10 MB.");
            return;
        }
        selectedFile = file;
        attachmentName.textContent = file.name;
        attachmentSize.textContent = formatFileSize(file.size);
        attachmentPreview.hidden = false;
    });
    removeFileBtn.addEventListener("click", clearSelectedFile);

    micBtn.addEventListener("click", () => {
        if (!recognition || isSending) return;
        if (isListening) recognition.stop();
        else recognition.start();
    });

    suggestionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            userInput.value = button.dataset.prompt || "";
            resizeInput();
            userInput.focus();
        });
    });

    clearBtn.addEventListener("click", () => {
        if (!window.confirm("Bạn muốn xóa toàn bộ cuộc trò chuyện hiện tại?")) return;
        chatMessages.innerHTML = "";
        conversationHistory = [];
        clearSelectedFile();
        appendMessage("bot", "Cuộc trò chuyện đã được làm mới. Mình có thể giúp gì cho bạn?", true);
        userInput.focus();
    });

    setupSpeechRecognition();
});
