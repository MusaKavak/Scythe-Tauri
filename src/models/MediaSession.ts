export class MediaSession {
    public actions = { Play: 2, Skip_To_Next: 0, Pause: 1, Stop: 3, Skip_To_Previous: 4 }
    constructor(
        public album: string,
        public albumArt: string,
        public artist: string,
        public duration: number,
        public packageName: string,
        public title: string
    ) {

    }
}