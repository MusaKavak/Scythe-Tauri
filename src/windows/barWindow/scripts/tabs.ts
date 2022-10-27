import { Shared } from "./shared"
import { SocketEmitter } from "../../../socket-io/socketEmitter"
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs"

const socketEmitter = new SocketEmitter()

const tabList = document.querySelectorAll(".tab")
const pageList = document.querySelectorAll("#page")
const pages = document.getElementById("pages")
const pagesContainer = document.getElementById("pagesContainer")
var currentTab = -1

for (let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener("mouseenter", () => {
        requestData(i)
        activateTab(i)
    })
}

function activateTab(tabId: number) {
    if (Shared.isWindowOpened) {
        if (currentTab != -1) {
            tabList[currentTab].classList.remove("active")
            pageList[currentTab].classList.remove("active")
        }
        tabList[tabId].classList.add("active")
        pageList[tabId].classList.add("active")
        currentTab = tabId
        pagesContainer?.classList.remove("disable")
        pages?.scrollTo({
            left: 500 * tabId,
            behavior: "smooth"
        })
    }
}

export function inactivateTabs() {
    if (currentTab != -1) {
        tabList[currentTab].classList.remove("active")
        pageList[currentTab].classList.remove("active")
    }
    currentTab = -1
    pagesContainer?.classList.add("disable")
}

var counter = 0
function requestData(i: number) {
    writeTextFile("Scythe\\deneme.txt", "Deneme" + counter, { dir: BaseDirectory.Document })

    if (i != currentTab) {
        switch (i) {
            case 0:
                socketEmitter.sendCurrentNotificationsRequest()
                break;
            case 2:
                socketEmitter.sendInternalStorageRequest()
                break;
        }
    }
}
