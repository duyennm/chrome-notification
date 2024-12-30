# Example Notifications for Chrome from Web Client

## Introduction
This is a Chrome Extension that demonstrates how to send notifications from a web client to Chrome. It includes:
- Receiving messages from a web client.
- Sending notifications via the Chrome Extension API.
- Injecting scripts into web pages.

---

## Features
- Display notifications from web client messages.
- Simple, clean architecture with `manifest.json` (Manifest V3).
- Communication between web page, content scripts, and background scripts.

---

## Installation

### Prerequisites
1. **Google Chrome** (Latest version recommended).
2. Basic knowledge of Chrome Extensions and JavaScript.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/duyennm/chrome-notification.git
   ```
2. Navigate to the project directory:
   ```bash
   cd notifications
   ```
3. Open Google Chrome and go to:
   ```
   chrome://extensions/
   ```
4. Enable **Developer mode** (top-right corner).
5. Click **Load unpacked** and select the project folder.

---

## Usage

### Sending Messages from a Web Client
1. Inject the following script into your web client (e.g., Next.js app):
    ```javascript
    const sendMessageToExtension = () => {
      window.postMessage(
        {
          type: "DATA_FROM_WEB",
          payload: { message: "Hello from Web Client!" },
        },
        "*"
      );
    };

    // Add a button for testing
    const button = document.createElement("button");
    button.textContent = "Send Message to Extension";
    button.onclick = sendMessageToExtension;
    document.body.appendChild(button);
    ```
2. When the button is clicked, the extension will:
   - Receive the message.
   - Display a notification in Chrome.

---

## File Structure
```
📂 Project Folder
├── 📂 icons                # Icons for the extension
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── 📂 libs                 # (Optional) External libraries
├── background.js           # Service worker for handling background events
├── content.js              # Script for interacting with web pages
├── inject.js               # Script injected into web pages
├── manifest.json           # Configuration file for the extension
├── popup.html              # HTML for the popup interface
├── popup.js                # JavaScript for popup behavior
├── styles.css              # Styling for the popup
└── README.md               # Documentation
```

---

## Development

### Communication Flow
1. **Inject Script** (`inject.js`):
   - Listens for events on the web page and forwards them to the content script.
2. **Content Script** (`content.js`):
   - Relays messages between the web page and the background script.
3. **Background Script** (`background.js`):
   - Processes the messages and triggers Chrome notifications.

### Key Code Snippets

#### Example of Message Listener (Content Script)
```javascript
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "DATA_FROM_WEB") {
    chrome.runtime.sendMessage({
      type: "WEB_MESSAGE",
      payload: event.data.payload,
    });
  }
});
```

#### Example of Notification (Background Script)
```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "WEB_MESSAGE") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon-128.png",
      title: "Message from Web Client",
      message: message.payload.message || "No content provided.",
    });
    sendResponse({ success: true });
  }
});
```

---

## Contribution
1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Author
Created by **Duyen Nguyen**.
