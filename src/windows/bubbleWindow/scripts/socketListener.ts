import { NotificationContent } from "../../../models/NotificationContent";
import { Client } from "../../../socket-io/client";
import { pushNotification } from "./notification";

const socket = new Client().getSocket()

if (socket != null) {
    socket.on("NewNotification", (notificationContent) => {
        pushNotification(JSON.parse(notificationContent) as NotificationContent);
    })
}




