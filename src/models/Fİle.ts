export class File {
    constructor(
        public path: string,
        public fileName: string,
        public fileExtension: string | null = null,
        public isDirectory: boolean | null = null,
        public subDirectories: File[] | null = null,
    ) { }
}