import { appWindow } from "@tauri-apps/api/window";
import axios from "axios";
import { Constants } from "../../constants";

function $(key: string): Element | null {
    return document.querySelector(key)
}
function $input(key: string): HTMLInputElement | null {
    return <HTMLInputElement | null>document.querySelector(key)
}
$("#header")?.addEventListener('mousemove', () => {
    appWindow.startDragging();
});

$("#loginButton")?.addEventListener('click', () => {
    axios.post(new Constants().databaseUrl + "users/usernamelogin", {
        "emailOrUserName": $input("#userName")?.value,
        "password": $input("#password")?.value
    }
    ).then((response) => {
        console.log(response)
    })
})