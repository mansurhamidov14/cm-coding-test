import { INewsItem, INewsService } from "./models";
import algoliaService from '../algoliaService';
import { SearchIndex } from "algoliasearch/lite";

export class NewsService implements INewsService {
    private service: SearchIndex;

    constructor () {
        this.service = algoliaService.initIndex('news');
    }

    public search = async (page: number = 1, q: string = ''): Promise<INewsItem[]> => {
        const response = await this.service.search(q, { page });
        return response.hits as any;
    }

    public getBySlug (slug: string): Promise<INewsItem> {
        // return new Promise((resolve, reject) => {
        //     const newsContent = this.list.find(({ slug: _slug }) => slug === _slug);
        //     if (newsContent) {
        //         resolve(newsContent);
        //     } else {
        //         reject('404 Page not found')
        //     }
        // });
        return null as any;
    }
}

export default new NewsService();
