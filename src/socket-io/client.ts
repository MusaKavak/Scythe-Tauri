import { io } from "socket.io-client"
import { Constants } from "../constants"

const socket = io(new Constants().webSocketUrl)

socket.on('connect', () => {
    socket.emit("JoinRoom", "1")
})
