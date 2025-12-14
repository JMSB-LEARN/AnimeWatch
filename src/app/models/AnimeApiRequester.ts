import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimeApiRequester {
    private readonly baseUrl = 'https://api.jikan.moe/v4';

    private async fetchData(endpoint: string) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    public async getAnimeList(page: number = 1) {
        return this.fetchData(`/anime?page=${page}`);
    }

    public async getAnimeDetails(id: number) {
        return this.fetchData(`/anime/${id}`);
    }

    public async getAnimeSearchByName(query: string) {
        const encodedQuery = encodeURIComponent(query);
        return this.fetchData(`/anime?q=${encodedQuery}`);
    }

    public async getAnimeEpisodes(id: number) {
        return this.fetchData(`/anime/${id}/episodes`);
    }

    public async getAnimeReviews(id: number) {
        return this.fetchData(`/anime/${id}/reviews`);
    }

    public async getAnimeRandom() {
        return this.fetchData(`/random/anime`);
    }
    public async getAnimeSearch(name: string, sfw: boolean, status: string) {
        let searchEndpoint: string = `/anime?q=${name}`;
        if (sfw) {
            searchEndpoint += `&sfw=${sfw}`;
        }
        if (status) {
            searchEndpoint += `&status=${status}`;
        }
        console.log(searchEndpoint);
        return this.fetchData(searchEndpoint);
    }
    public async getTopAnimes() {
        return this.fetchData(`/top/anime?limit=10`);
    }
    public async getAnimeSeason() {
        return this.fetchData(`/seasons/now`);
    }
    public async getAnimeSeasonNext() {
        return this.fetchData(`/seasons/upcoming`);
    }
}