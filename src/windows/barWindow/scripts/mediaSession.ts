import { } from "module";
import { MediaSession } from "../../../models/MediaSession";
import { Constants } from "../../../constants";
import { SocketEmitter } from "../../../socket-io/socketEmitter";
import { Shared } from "./shared";


const mediaSessionAreaContainer = document.getElementById("mediaSessionAreaContainer")
const mediaSessionArea = document.getElementById("mediaSessionArea")


declare global {
    interface Element {
        setId(id: string): void
    }
}

Element.prototype.setId = function (id: string) {
    this.setAttribute("id", id);
}

export function updateMediaSession(mediaSessions: MediaSession[]) {
    if (
        Shared.isMouseOnBody
    ) {
        if (mediaSessions.length != 0) mediaSessionAreaContainer?.classList.remove("disable")
        mediaSessions.forEach((session) => {
            const currentSessions = document.querySelectorAll("#session")
            if (currentSessions.length == 0) {
                add(session)
            } else {
                controlForAdd(currentSessions, session)
                controlCurrentSessions(currentSessions, mediaSessions)
            }
        })
    }
}

function controlForAdd(sessions: NodeListOf<Element>, ms: MediaSession) {
    var isPackageFound = false;
    var foundedPackage: Element | null = null
    sessions.forEach(s => {
        if (s.classList.contains(ms.packageName)) { isPackageFound = true; foundedPackage = s }
    })
    if (isPackageFound) {
        if (foundedPackage!!.children[1].children[1].textContent == ms.title) {
            if (foundedPackage!!.children[0].getAttribute("src") == "undefined") {
                foundedPackage!!.children[0].setAttribute("src", "data:image/png;base64," + ms.albumArt)
            }
        } else {
            foundedPackage!!.remove()
            add(ms)
        }
    } else {
        add(ms)
    }
}

function controlCurrentSessions(currentSessions: NodeListOf<Element>, newSessions: MediaSession[]) {
    currentSessions.forEach(cs => {
        var isContains = false
        newSessions.forEach(ns => {
            if (cs.classList.contains(ns.packageName)) { isContains = true }
        });

        if (!isContains) {
            cs.remove()
        }
    });
}

function add(ms: MediaSession) {
    mediaSessionArea?.insertAdjacentElement("afterbegin", createSessionElement(ms));
}

function createSessionElement(ms: MediaSession) {
    const pckg = ms.packageName;
    const constants = new Constants();
    //////////////////////////////////////////////
    const session = createElement();
    session.setId("session");
    session.classList.add(ms.packageName)
    //////////////////////////////////////////////
    const albumArt = document.createElement("img");
    albumArt.setId("albumArt");
    if (ms.albumArt.length > 10) {
        albumArt.setAttribute("src", "data:image/png;base64," + ms.albumArt);
    } else {
        albumArt.setAttribute("src", "undefined");
    }
    //////////////////////////////////////////////
    const header = createElement();
    header.setId("header");
    //////////////////////////////////////////////
    const artist = createElement();
    artist.setId("artist");
    artist.textContent = ms.artist;
    //////////////////////////////////////////////
    const title = createElement();
    title.setId("title");
    title.textContent = ms.title
    //////////////////////////////////////////////
    const controls = createElement();
    controls.setId("controls");
    //////////////////////////////////////////////
    const previous = createElement();
    previous.setId("previous");
    previous.innerHTML = constants.svgPrevious;
    previous.addEventListener('click', () => sendAction(pckg, 0));
    //////////////////////////////////////////////
    const pause = createElement();
    pause.setId("pause");
    pause.innerHTML = constants.svgPause;
    pause.addEventListener('click', () => sendAction(pckg, 1));
    //////////////////////////////////////////////
    const play = createElement();
    play.setId("play");
    play.innerHTML = constants.svgPlay
    play.addEventListener('click', () => sendAction(pckg, 2));
    //////////////////////////////////////////////
    const next = createElement();
    next.setId("next");
    next.innerHTML = constants.svgNext;
    next.addEventListener('click', () => sendAction(pckg, 4));
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    header.appendChild(artist);
    header.appendChild(title);
    //////////////////////////////////////////////
    controls.appendChild(previous);
    controls.appendChild(pause);
    controls.appendChild(play);
    controls.appendChild(next);
    //////////////////////////////////////////////
    session.appendChild(albumArt);
    session.appendChild(header);
    session.appendChild(controls);
    return session;
}

function createElement(tag: string = "div"): Element {
    return document.createElement(tag);
}

const socketEmitter = new SocketEmitter()
function sendAction(packageName: string, actionId: number) {
    socketEmitter.sendMediaControlAction(packageName, actionId)
}