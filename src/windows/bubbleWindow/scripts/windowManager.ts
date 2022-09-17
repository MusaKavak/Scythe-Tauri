import { appWindow, currentMonitor } from "@tauri-apps/api/window";

export async function notificationExpand(): Promise<InsertPosition> {
    const screenSize = await currentMonitor();
    const windowsPosition = await appWindow.outerPosition();
    const widowSize = await appWindow.outerSize();

    if ((widowSize.width + windowsPosition.x) > screenSize!.size.width) {
        return 'beforebegin';
    } else {
        return 'afterend';
    }
}