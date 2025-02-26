interface INewsTopics {
    id: string;
    title: string;
}

interface IOrganizatioFields {
    name: string;
}

interface IOrganization {
    fields: IOrganizatioFields;
}

export interface INewsItem {
    slug: string;
    name: string;
    topics: INewsTopics[];
    description: string;
    content: string;
    imageUrl: string;
    organization: IOrganization[];
    publicationDate: string;
}

export interface IPage {
    page: number;
    news: INewsItem[];
}

export interface INewsService {
    search: (page?: number, q?: string) => Promise<INewsItem[]>;
    searchTopics: (q: string) => Promise<ITopicsSearchResult[]>;
    getTop: () => Promise<INewsItem[]>;
    getBySlug: (slug: string) => Promise<INewsItem>;
    getByTopics: (topics: string, page?: number) => Promise<INewsItem[]>
}

export interface ITopicsSearchResult {
    count: number;
    highlighted: string;
    value: string;
}

export interface INewsResponse {
    hits: INewsItem[];
    nbHits: number;
}
