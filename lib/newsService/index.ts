import { INewsItem, INewsService, IPage } from "./models";

export class NewsService implements INewsService {
    private baseUrl = 'https://newsdata.io/api/1/news?apikey=pub_449319497558972e879cf6493f0e25bce9a6&language=en';
    private list: IPage[];

    constructor () {
        const list = typeof window !== 'undefined' && localStorage.getItem('pages');
        this.list = list ? JSON.parse(list) as IPage[] : [];
    }

    private getFullList (): INewsItem[] {
        return this.list.reduce((acc, val) => [...acc, ...val.news], [] as INewsItem[]);
    }

    private getFromStorage (pageNumber: number): INewsItem[] | undefined {
        return this.list.find(({ page }) => page === pageNumber)?.news;
    }

    public getList = (page: number = 1): Promise<INewsItem[]> => {
        const fromStorage = this.getFromStorage(page);
        if (fromStorage) {
            return new Promise((res) => setTimeout(() => res(fromStorage), 1500));
        } else {
            return fetch(`${this.baseUrl}&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    this.list.push({
                        page: page,
                        news: data.results
                    });
                    typeof window !== 'undefined' && localStorage.setItem('pages', JSON.stringify(this.list));
                }) as Promise<INewsItem[]>;
        }
    }

    public search (q: string):  Promise<INewsItem[]> {
        const query = q.toLowerCase();
        const result = this.getFullList().filter((item) => item.title?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query));
        return Promise.resolve(result);
    }

    public getBySlug (slug: string): Promise<INewsItem> {
        return Promise.resolve({} as INewsItem);
    }
}

export default new NewsService();
