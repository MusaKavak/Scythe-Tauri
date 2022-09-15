import { appWindow, LogicalSize } from '@tauri-apps/api/window'

appWindow.setSize(new LogicalSize(60, 60))
appWindow.setSize(new LogicalSize(0, 0))
appWindow.setSize(new LogicalSize(60, 60))

document.getElementById("bubble")?.addEventListener('mouseover', () => {
    appWindow.startDragging()
})