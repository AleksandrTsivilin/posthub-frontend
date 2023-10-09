export interface CommentInfo {
    id: number,
    userName: string,
    email: string,
    text: string,
    children?: CommentInfo[]
    homePage?: string,
    file?: any
}