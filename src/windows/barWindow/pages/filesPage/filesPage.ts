import "./filesPage.css";
import { File } from "../../../../models/Fİle";
import { SocketEmitter } from "../../../../socket-io/socketEmitter";

function createDiv(id: string | null, textContent: string | null = null): HTMLElement {
    const element = document.createElement("div")
    if (id != null) element.setAttribute("id", id)
    if (textContent != null) element.textContent = textContent
    return element

}

const filesPage = document.getElementById("filesPage")
var currentPageId = -1

export function createFolder(file: File, isRootFile: boolean) {
    if (isRootFile) { filesPage!!.innerHTML = ""; currentPageId = -1 }
    const folder = createDiv("folder")
    const header = createDiv("header")
    const currentFileName = createDiv("currentFileName", file.fileName)
    const itemCount = createDiv("itemCount", file.subDirectories?.length.toString())
    const fileListArea = createDiv("fileListArea")

    if (!isRootFile) {
        const previousButton = createDiv("previousButton", "<")
        previousButton.addEventListener("click", () => {
            document.querySelectorAll("#folder")[currentPageId - 1].classList.remove("previous")
            currentPageId--
            folder.remove()
        })
        header.appendChild(previousButton)
    }
    header.appendChild(currentFileName)
    header.appendChild(itemCount)
    createList(fileListArea, file.subDirectories)
    folder.appendChild(header)
    folder.appendChild(fileListArea)

    currentPageId++
    filesPage?.appendChild(folder)
}

function createList(listArea: HTMLElement, subDirectories: File[] | null) {
    subDirectories?.forEach(item => {
        const listItem = createDiv("listItem")
        listItem.textContent = item.fileName
        listItem.addEventListener("click", () => {
            if (item.isDirectory) {
                createFolder(item, false)
                document.querySelectorAll("#folder")[currentPageId - 1].classList.add("previous")
            }
            else {
                console.log("It's a file")
                listItem.addEventListener("click", () => {
                    requestFile(item)
                })
            }
        })

        listArea?.appendChild(listItem)
    })
}

const socketEmitter = new SocketEmitter()
function requestFile(file: File) {
    socketEmitter.sendFileRequest(file.path)
}