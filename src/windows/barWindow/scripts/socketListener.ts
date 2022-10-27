import { Client } from "../../../socket-io/client";
import { createFolder } from "../pages/filesPage/filesPage";
import { loadNotifications, newNotification } from "../pages/notificationPage/notificationPage";
import { updateMediaSession } from "./mediaSession";


const socket = Client.getSocket()

if (socket != null) {
    socket.on("AndroidMediaSessionResponse", (data) => {
        updateMediaSession(JSON.parse(data))
    })

    socket.on("AndroidNewNotification", (data) => {
        newNotification(JSON.parse(data))
    })

    socket.on("AndroidCurrentNotificationsResponse", (data) => {
        loadNotifications(JSON.parse(data))
    })

    socket.on("AndroidInternalStorageResponse", (data) => {
        var jsonData = JSON.parse(data)
        console.log(jsonData)
        createFolder(jsonData, true)
    })

    socket.on("AndroidFileResponse", (data) => {
        console.log(data)
    })
}

