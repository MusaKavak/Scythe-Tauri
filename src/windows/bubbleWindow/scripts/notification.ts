import { NotificationContent } from "../../../models/NotificationContent";
import { notificationExpand } from "./windowManager";

console.log("Init")

const queue: NotificationContent[] = [];
var isNotificationActive: boolean = false;

export async function pushNotification(content: NotificationContent) {
    if (isNotificationActive) {
        queue.push(content);
    } else {

        const position = await notificationExpand();
        const notificationHtml = `
        <div id="notification-container">
        <div id="notification-header">
        <img id="notification-icon" src="data: image / png; base64,${content.icon}"></img>
        <div id="notification-title">${content.title}</div>
        </div>
        <div id="notification-body">${content.text}</div>
        </div>
        `
        document.getElementById("bubble")?.insertAdjacentHTML(position, notificationHtml);
        isNotificationActive = true
        closeNotification(content);
    }
}

function closeNotification(content: NotificationContent) {
    setTimeout(function () {
        document.getElementById("notification-container")?.outerHTML ? = null;
        isNotificationActive = false
        nextNotification(content);
    }, 3000);
}

function nextNotification(content: NotificationContent) {
    pushNotification(content)
}

