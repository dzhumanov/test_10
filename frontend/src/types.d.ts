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

export interface NewsMutation {
  title: string;
  content: string;
  image: File | null;
}

export interface Comments {
  id: string;
  newsId: string;
  author: string;
  content: string;
}
