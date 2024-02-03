export interface News {
    id: string;
    title: string;
    image: string | null;
    date: Date;
}

export interface FullNewsType {
    id: string;
    title: string;
    image: string | null;
    date: Date;
    content: string;
}