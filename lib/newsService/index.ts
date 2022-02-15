import { INewsItem, INewsService, ITopicsSearchResult } from "./models";
import algoliaService from '../algoliaService';
import { SearchIndex } from "algoliasearch/lite";

export class NewsService implements INewsService {
    public service: SearchIndex;
    public recordsCount?: number;

    constructor () {
        this.service = algoliaService.initIndex('news');
    }

    public search = async (page?: number, q: string = ''): Promise<INewsItem[]> => {
        const response = await this.service.search(q, { page });
        this.recordsCount = response.nbHits;
        return response.hits as any;
    }

    public getTop = async (): Promise<INewsItem[]> => {
        const response = await this.service.search('', { filters: 'avgRating > 4', hitsPerPage: 3 });
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

    public searchTopics = async (q: string): Promise<ITopicsSearchResult[]> => {
        const { facetHits } = await this.service.searchForFacetValues('topics.title', q);
        return facetHits as any;
    }

    public getByTopics = async (topics: string, page?: number): Promise<INewsItem[]> => {
        const response = await this.service.search('', { filters: `topics.title:"${topics}"`, page });
        this.recordsCount = response.nbHits;
        return response.hits as any;
    }
}

export default new NewsService();
