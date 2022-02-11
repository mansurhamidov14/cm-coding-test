export interface INewsItem {
    slug?: string;
    title: string;
    category: string[];
    description: string;
    content: string;
    image_url: string | null;
    creator: string[];
    publicationDate: string;
}

export interface IPage {
    page: number;
    news: INewsItem[];
}

export interface INewsService {
    getList: (page?: number) => Promise<INewsItem[]>;
    search: (q: string) => Promise<INewsItem[]>;
}
