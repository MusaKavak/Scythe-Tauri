import { appWindow, WebviewWindow } from '@tauri-apps/api/window';
import { UserState } from "./src/userState";

var url: string;
var label: string;

if (UserState.getUser() != null) {
    url = "./src/windows/barWindow/index.html";
    label = "Scythe";
} else {
    url = "./src/windows/loginWindow/index.html";
    label = "Login";
}

const newWindow = new WebviewWindow(label!!, {
    url: url!!,
    decorations: false,
    width: 800,
    height: 600,
    center: true,
    transparent: true
});

newWindow.once('tauri://created', () => {
    appWindow.close();
})
