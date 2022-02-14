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
    getTop: () => Promise<INewsItem[]>;
    getBySlug: (slug: string) => Promise<INewsItem>;
}
