export function hideNotifications() {
    let notificationsList = document.querySelector(".notifications");
    notificationsList.addEventListener("click", hideNotification);
}

function hideNotification(event) {
    let clickedElement = event.target;
    if (clickedElement.classList.contains("notification-close")) {
        let notificationItem = clickedElement.parentElement;
        notificationItem.style.display = "none";
    }
}
