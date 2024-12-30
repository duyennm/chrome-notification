window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "DATA_FROM_WEB") {
        console.log("Inject.js: Received data from web page:", event.data);

        // Send data to content script via CustomEvent
        window.dispatchEvent(
            new CustomEvent("fromWebPage", { detail: event.data.payload })
        );
    }
});
