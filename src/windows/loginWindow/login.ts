import { appWindow, WebviewWindow, } from "@tauri-apps/api/window";
import axios from "axios";
import { Constants } from "../../constants";
import { User } from "../../models/User";
import { UserState } from "../../userState";

function $(key: string): Element | null {
    return document.querySelector(key)
}
function $input(key: string): HTMLInputElement | null {
    return <HTMLInputElement | null>document.querySelector(key);
}
$("#header")?.addEventListener('mousemove', () => {
    appWindow.startDragging();
});

$("#loginButton")?.addEventListener('click', () => {
    axios.post(new Constants().databaseUrl + "users/usernamelogin", {
        "emailOrUserName": $input("#userName")?.value,
        "password": $input("#password")?.value
    }).then((response) => manageUserLoginResponse(response.data)).catch((err) => {
        console.info(err);
    })
})

function manageUserLoginResponse(data: { user: User | null, status: string }) {
    console.log(data.status)
    switch (data.status) {
        case "User Not Found":
            break;
        case "Wrong Password":
            break;
        case "Login Successful":
            saveUser(data.user);
    }
}
function saveUser(user: User | null) {
    if (user == null) { console.info("Some Error Occurred"); return; }

    localStorage.setItem("UserState", JSON.stringify(user));

    const newWindow = new WebviewWindow("Scythe", {
        url: "./src/windows/barWindow/index.html",
        decorations: false,
        width: 800,
        height: 600,
        center: true,
        transparent: true,
    })

    newWindow.once('tauri://created', () => {
        appWindow.close();
    })
}

