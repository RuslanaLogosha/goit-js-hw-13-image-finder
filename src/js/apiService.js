import { parseWithoutProcessing } from "handlebars";

const API_KEY = '18957101-8b16af6433f6d6830b4844a72';
const BASE_URL = 'https://pixabay.com/api/';


export default class ImagesApiService {
    consturctor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const searchParams = new URLSearchParams({
            q: this.searchQuery,
            per_page: 12,
            page: this.page,
        });
        
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&${searchParams}&key=${API_KEY}`;
        
        const response = await fetch(url);
        const totalResults = await response.json();
        this.incrementPage();
        return totalResults.hits;
    }

    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}

