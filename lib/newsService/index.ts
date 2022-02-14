import { INewsItem, INewsService } from "./models";
import algoliaService from '../algoliaService';
import { SearchIndex } from "algoliasearch/lite";

export class NewsService implements INewsService {
    private service: SearchIndex;

    constructor () {
        this.service = algoliaService.initIndex('news');
    }

    public search = async (page?: number, q: string = ''): Promise<INewsItem[]> => {
        const response = await this.service.search(q, { page });
        return response.hits as any;
    }

    public async getBySlug (slug: string): Promise<INewsItem> {
        const searchRes = await this.search(undefined, slug);
        if (searchRes.length) {
            return searchRes[0];
        } else {
            throw new Error('404 Page not found');
        }
    }
}

export default new NewsService();
