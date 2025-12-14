import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { AnimeApiRequester } from '../../models/AnimeApiRequester';
import { Anime } from '../../models/Anime';
import { convert_to_anime } from '../../models/Anime';
import { AnimeCardComponent } from '../../components/anime-card-component/anime-card-component';


@Component({
  selector: 'app-home-page',
  imports: [CarouselModule, AnimeCardComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  topAnimes: Anime[] = [];
  seasonalAnimes: Anime[] = [];
  seasonalNextAnimes: Anime[] = [];

  constructor(private animeApiRequester: AnimeApiRequester) { }

  ngOnInit(): void {
    this.loadAllAnimes();
  }

  async loadAllAnimes() {
    await Promise.all([
      this.getTopAnimes(),
      this.getSeasonAnimes(),
      this.getSeasonNextAnimes()
    ]);
  }

  async getTopAnimes() {
    const result = await this.animeApiRequester.getTopAnimes();
    this.topAnimes = result.data.map((item: any) => convert_to_anime({
      id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      score: item.score,
    }));
  }

  async getSeasonAnimes() {
    const result = await this.animeApiRequester.getAnimeSeason();
    this.seasonalAnimes = result.data.map((item: any) => convert_to_anime({
      id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      score: item.score,
    }));
  }

  async getSeasonNextAnimes() {
    const result = await this.animeApiRequester.getAnimeSeasonNext();
    this.seasonalNextAnimes = result.data.map((item: any) => convert_to_anime({
      id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      score: item.score,
    }));
  }
}


