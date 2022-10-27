import { io, Socket } from "socket.io-client"
import { Constants } from "../constants"
import { UserState } from "../userState";

export class Client {
    static socket: Socket | undefined = undefined;

    static getSocket(): Socket | undefined {
        if (Client.socket == undefined) {
            const user = UserState.getUser();
            if (user == undefined) {
                return undefined;
            } else {
                Client.socket = io(new Constants().webSocketUrl)
                Client.socket.on('connect', () => {
                    Client.socket!.emit("JoinRoom", user.id.toString(), "Tauri")
                })
                return Client.socket
            }
        }
        return Client.socket
    }
}

