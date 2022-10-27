import { Shared } from "./shared";
import { SocketEmitter } from "../../../socket-io/socketEmitter";
import { inactivateTabs } from "./tabs";
import { initWindow, onMouseEnter, onMouseLeft } from "./windowManager";
import { listen } from "@tauri-apps/api/event";

function $(key: string): HTMLElement | null {
    return document.querySelector(key)
}

initWindow()
const socketEmitter = new SocketEmitter()
const body = document.body
const tabsContainer = $("#tabsContainer")
const mediaSessionAreaContainer = $("#mediaSessionAreaContainer")
const shared = Shared

body.addEventListener("mouseenter", () => {
    shared.isMouseOnBody = true
    if (!shared.isWindowOpened && !shared.isWindowOpeningOrClosing) {
        setTimeout(() => {
            if (shared.isMouseOnBody) {
                setVariablesOnEnter()
                setClassesOnEnter()
                socketEmitter.sendMediaSessionRequest()
            }
        }, 300);
    }
})
body.addEventListener("mouseleave", () => {
    shared.isMouseOnBody = false
    if (shared.isWindowOpened) {
        setVariablesOnExit()
        setClassesOnExit()
    } else {
        setTimeout(() => {
            setVariablesOnExit()
            setClassesOnExit()
        }, 500);
    }
})

function setVariablesOnEnter() {
    shared.isWindowOpeningOrClosing = true
    onMouseEnter()
    setTimeout(() => {
        shared.isWindowOpeningOrClosing = false
        shared.isWindowOpened = true
    }, 500);
}
function setVariablesOnExit() {
    onMouseLeft()
    setTimeout(() => {
        shared.isWindowOpeningOrClosing = false
        shared.isWindowOpened = false
    }, 500);
    inactivateTabs()
}


function setClassesOnEnter() {
    removeDisable(body)
    removeDisable(tabsContainer)
}

function setClassesOnExit() {
    addDisable(body)
    addDisable(tabsContainer)
    addDisable(mediaSessionAreaContainer)
}

function addDisable(element: HTMLElement | null) {
    if (!element?.classList.contains("disable")) {
        element?.classList.add("disable")
    }
}
function removeDisable(element: HTMLElement | null) {
    element?.classList.remove("disable")
}


listen('tauri://file-drop', (event) => {
    console.log(event)
})

listen('tauri://file-drop-hover', (event) => {
    console.log(event)
})

listen('tauri://file-drop-cancelled', (event) => {
    console.log(event)
})


