export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    authorName: string;
    tags: string;
    summary: string;
    time: string;
    readTime: string;
}
