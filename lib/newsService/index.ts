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
        const { hits } = await this.service.search('', {filters: `slug:${slug}`});
        if (hits.length) {
            return hits[0] as any;
        } else {
            throw new Error('404 Page not found');
        }
    }
}

export default new NewsService();
