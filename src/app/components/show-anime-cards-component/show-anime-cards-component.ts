import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AnimeApiRequester } from '../../models/AnimeApiRequester';
import { Anime, convert_to_anime } from '../../models/Anime';
import { AnimeCardComponent } from '../anime-card-component/anime-card-component';
@Component({
  selector: 'app-show-anime-cards-component',
  imports: [AnimeCardComponent],
  templateUrl: './show-anime-cards-component.html',
  styleUrl: './show-anime-cards-component.css',
})
export class ShowAnimeCardsComponent implements OnChanges {
  @Input() searchCriteria: { name: string, sfw: boolean, status: string } = { name: '', sfw: false, status: 'Airing' };
  Animes: Anime[] = [];
  isLoading: boolean = false;
  error: string = '';
  private animeApiRequester = inject(AnimeApiRequester);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchCriteria'] && this.searchCriteria.name) {
      this.searchAnime();
    }
  }

  async searchAnime() {
    this.isLoading = true;
    try {
      const result = await this.animeApiRequester.getAnimeSearch(
        this.searchCriteria.name,
        this.searchCriteria.sfw,
        this.searchCriteria.status
      );
      console.log('API Result:', result);
      this.Animes = [];
      for (const animeData of result.data) {
        this.Animes.push(convert_to_anime({
          id: animeData.mal_id,
          title: animeData.title,
          image_url: animeData.images.jpg.image_url,
          score: animeData.score
        }));
      }
      console.log(this.Animes);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
