chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension has been installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "WEB_MESSAGE") {
        console.log("Data from web client:", message.payload);

        // Display a notification
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon-128.png", // Path to the icon
            title: "Notification from web client",
            message: message.payload.message || "No content provided."
        });

        sendResponse({ success: true });
    }
});
