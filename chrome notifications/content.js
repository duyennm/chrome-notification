if (!window.location.href.startsWith("chrome://") && !window.location.href.startsWith("chrome-extension://")) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");
    (document.head || document.documentElement).appendChild(script);
    script.onload = () => script.remove();
} else {
    console.warn("Cannot inject script into special pages.");
}

// Listen for data from inject.js via CustomEvent
window.addEventListener("fromWebPage", (event) => {
    const payload = event.detail;
    console.log("Content Script: Received data from web page:", payload);

    // Send data to the background script
    chrome.runtime.sendMessage({
        type: "WEB_MESSAGE",
        payload: payload,
    });
});
