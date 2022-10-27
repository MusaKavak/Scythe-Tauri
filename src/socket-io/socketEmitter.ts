import { Socket } from "socket.io-client";
import { User } from "../models/User";
import { Client } from "./client";
import { UserState } from "../userState";


export class SocketEmitter {
    private u(): User | undefined {
        return UserState.getUser()
    }
    private s(): Socket | undefined {
        return Client.getSocket()
    }

    private check(): boolean {
        return this.u() != undefined && this.s != undefined
    }

    sendMediaSessionRequest() {
        if (this.check()) this.s()!!.emit("AndroidMediaSessionRequest", this.u()!!.id)
    }

    sendMediaControlAction(packageName: string, actionId: number) {
        if (this.check()) {
            this.s()!!.emit("AndroidMediaSessionControl", packageName, actionId, this.u()!!.id);
            setTimeout(() => {
                this.sendMediaSessionRequest()
            }, 500);
        }
    }

    sendCurrentNotificationsRequest() {
        if (this.check()) this.s()!!.emit("AndroidCurrentNotificationsRequest", this.u()!!.id)
    }

    sendNotificationAction(notificationKey: string, actionTitle: string) {
        if (this.check()) this.s()!!.emit("AndroidNotificationActionControl", notificationKey, actionTitle, this.u()!!.id)
    }
    sendInternalStorageRequest() {
        if (this.check()) this.s()!!.emit("AndroidInternalStorageRequest", this.u()!!.id)
    }

    sendFileRequest(filePath: string) {
        if (this.check()) this.s()!!.emit("AndroidFileRequest", filePath, this.u()!!.id)
    }
}