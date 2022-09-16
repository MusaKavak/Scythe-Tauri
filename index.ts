import { appWindow, WebviewWindow } from '@tauri-apps/api/window';
import { UserState } from "./src/userState";

var url: string;
var label: string;

const userState = localStorage.getItem("UserState");
if (userState != null && userState.length > 5) {
    url = "./src/windows/bubbleWindow/index.html";
    label = "Scythe";
    UserState.user = JSON.parse(userState);
} else {
    url = "./src/windows/loginWindow/index.html";
    label = "Login";
}

const newWindow = new WebviewWindow(label!!, {
    url: url!!,
    decorations: false,
    width: 800,
    height: 600,
    center: true
});

newWindow.once('tauri://created', () => {
    appWindow.close();
})
