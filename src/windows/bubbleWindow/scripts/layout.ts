import { appWindow, LogicalSize } from "@tauri-apps/api/window";

function setWindowSize(width: number, height: number) {
    appWindow.setSize(new LogicalSize(width, height))
}

setWindowSize(60, 60)
setWindowSize(0, 0)
setWindowSize(500, 200)
appWindow.setResizable(false)
appWindow.setAlwaysOnTop(true)


function $(key: string): Element | null {
    return document.querySelector(key)
}

$("#bubble")?.addEventListener("mouseover", () => {
    appWindow.startDragging()
})