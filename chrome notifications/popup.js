document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.getElementById("close-btn");

    closeButton.addEventListener("click", () => {
        alert("Notification closed!");
        window.close(); // Close the popup window
    });
});
