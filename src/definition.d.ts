declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.jpg' {
    const content: any;
    export default content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.webm' {
    const content: any;
    export default content;
}

declare module '*.mp4' {
    const content: any;
    export default content;
}

// タグ情報のタイプ
type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";

// 投稿情報のインターフェース
interface Page {
    page_id: number,
    title: string,
    tag: Tag,
    text: string,
    user: number,
    location_name: string,
    location: {
        x: number,
        y: number
    }
    image: string,
    good: number,
    go: number,
    went: number,
    user_status: string[]
}