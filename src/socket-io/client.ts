import { io, Socket } from "socket.io-client"
import { Constants } from "../constants"
import { UserState } from "../userState";

export class Client {
    static socket: Socket | null = null;

    getSocket(): Socket | null {
        if (Client.socket == null) {
            const user = UserState.getUser();
            if (user == null) {
                console.log("User Is Not Logged In");
                return null;
            } else {
                Client.socket = io(new Constants().webSocketUrl)

                Client.socket.on('connect', () => {
                    Client.socket!.emit("JoinRoom", user.id.toString())
                })
                console.log("Client is null")
                return Client.socket
            }
        }
        console.log("Client is not null")
        return Client.socket
    }
}

