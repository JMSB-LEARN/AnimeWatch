import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AnimeApiRequester } from '../../clases/AnimeApiRequester';
import { Anime } from '../../clases/Anime';

@Component({
  selector: 'app-show-anime-cards-component',
  imports: [],
  templateUrl: './show-anime-cards-component.html',
  styleUrl: './show-anime-cards-component.css',
})
export class ShowAnimeCardsComponent implements OnChanges {
  @Input() searchCriteria: { name: string, sfw: boolean, status: string } = { name: '', sfw: false, status: 'Airing' };
  Animes: Anime[] = [];
  private animeApiRequester = inject(AnimeApiRequester);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchCriteria'] && this.searchCriteria.name) {
      this.searchAnime();
    }
  }

  async searchAnime() {
    try {
      const result = await this.animeApiRequester.getAnimeSearch(
        this.searchCriteria.name,
        this.searchCriteria.sfw,
        this.searchCriteria.status
      );
      console.log('API Result:', result);
      this.Animes = []; // Clear previous results
      for (const animeData of result.data) {
        this.Animes.push({
          id: animeData.mal_id,
          title: animeData.title,
          image_url: animeData.images.jpg.image_url,
          score: animeData.score
        } as Anime);
      }
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  }
}
