import { appWindow, currentMonitor, LogicalPosition, LogicalSize } from "@tauri-apps/api/window";
import { Shared } from "./shared";

export function setWindowSize(width: number, height: number) {
    appWindow.setSize(new LogicalSize(width, height))
}

export async function initWindow() {
    appWindow.setAlwaysOnTop(true)
    appWindow.setResizable(false)
    appWindow.setSkipTaskbar(true)
    setWindowSize(500, 7)
    setTimeout(async () => {

        const bodyWidth = document.body.clientWidth
        const screenWidth = (await currentMonitor())?.size.width


        if (screenWidth != null) {
            const x = (screenWidth / 2) - (bodyWidth / 2)
            // appWindow.setPosition(new LogicalPosition(2000, 0))
            appWindow.setPosition(new LogicalPosition(x, 0))
            appWindow.setPosition(new LogicalPosition(x, 0))
        }
    }, 500);
}


export async function onMouseEnter() {
    Shared.isMouseOnBody = true
    const screenHeight = (await currentMonitor())?.size.height
    setWindowSize(500, screenHeight!!)
}

export function onMouseLeft() {
    Shared.isMouseOnBody = false
    var bodyHeight = document.body.clientHeight
    setWindowSize(500, bodyHeight)
    setTimeout(() => {
        setWindowSize(500, 7)
    }, 500);
}
