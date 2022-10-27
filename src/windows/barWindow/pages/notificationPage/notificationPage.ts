import "./notificationPage.css"
import { NotificationContent } from "../../../../models/NotificationContent"
import { SocketEmitter } from "../../../../socket-io/socketEmitter"
import { setWindowSize } from "../../scripts/windowManager"
import { Shared } from "../../scripts/shared"

const notificationPage = document.getElementById("notificationPage")!!
const newNotificationContainer = document.getElementById("newNotificationContainer")

export function loadNotifications(data: NotificationContent[]) {
    notificationPage.innerHTML = ""
    data.forEach(nc => {
        notificationPage.appendChild(createNotification(nc, false))
    })
}

var isMouseOnNewNotification = false
export function newNotification(data: NotificationContent) {
    if (data == null || data == undefined) return
    newNotificationContainer!!.innerHTML = ""
    newNotificationContainer?.appendChild(createNotification(data, true))
    newNotificationContainer?.classList.remove("disable")
    closeNewNotification()
    if (!Shared.isWindowOpened) {
        setWindowSize(500, 153)
    }
}

function closeNewNotification() {
    setTimeout(() => {
        if (!isMouseOnNewNotification) {
            newNotificationContainer?.classList.add("disable")
            setTimeout(() => {
                if (!Shared.isWindowOpened) {
                    setWindowSize(500, 7)
                }
            }, 500);
        }

    }, 8000);
}

function createDiv(id: string | null = null) {
    const div = document.createElement("div")
    if (id != null) {
        div.setAttribute("id", id)
    }
    return div
}

function createNotification(nc: NotificationContent, isNewNotification: boolean): HTMLElement {
    const newNotification: HTMLElement = isNewNotification ? createDiv("newNotification") : createDiv("notification")

    if (isNewNotification) {
        newNotification.addEventListener("mouseenter", () => {
            isMouseOnNewNotification = true
        })
        newNotification.addEventListener("mouseleave", () => {
            isMouseOnNewNotification = false
            closeNewNotification()
        })
    }
    /////////////////////////////////////////////////
    var largeIcon = null
    if (nc.largeIcon != null) {
        largeIcon = document.createElement("img")
        largeIcon.setAttribute("id", "largeIcon")
        largeIcon.setAttribute("src", "	data:image/png;base64," + nc.largeIcon)
    }
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    const appInfo = createDiv("appInfo")
    /////////////////////////////////////////////////
    const appName = createDiv("appName")
    appName.textContent = nc.appName
    /////////////////////////////////////////////////
    var appIcon = null
    if (nc.appIcon != null) {
        appIcon = document.createElement("img")
        appIcon.setAttribute("id", "appIcon")
        appIcon.setAttribute("src", "	data:image/png;base64," + nc.appIcon)
    }
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    const contentArea = createDiv("contentArea")
    /////////////////////////////////////////////////
    const title = createDiv("title")
    title.textContent = nc.title
    /////////////////////////////////////////////////
    const text = createDiv("text")
    text.textContent = nc.text
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    const actionArea = createDiv("actionArea")
    /////////////////////////////////////////////////
    if (nc.actionList != null)
        nc.actionList.forEach(action => {
            const a = createDiv()
            a.textContent = action.title
            actionArea.appendChild(a)
            a.addEventListener("click", () => {
                sendAction(nc.key, action.title)
            })
        });
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    if (appIcon != null) appInfo.appendChild(appIcon)
    appInfo.appendChild(appName)
    /////////////////////////////////////////////////
    contentArea.appendChild(title)
    contentArea.appendChild(text)
    /////////////////////////////////////////////////
    if (largeIcon != null) newNotification.appendChild(largeIcon)
    newNotification.appendChild(appInfo)
    newNotification.appendChild(contentArea)
    if (nc.actionList != null) newNotification.appendChild(actionArea)

    return newNotification
}

const socketEmitter = new SocketEmitter()
function sendAction(notificationKey: string | null, actionTitle: string | null) {
    if (notificationKey != null && actionTitle != null) {
        socketEmitter.sendNotificationAction(notificationKey, actionTitle)
        setTimeout(() => {
            socketEmitter.sendCurrentNotificationsRequest()
        }, 500);
    }
}