import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anime, Episode } from '../../models/Anime';
import { AnimeApiRequester } from '../../models/AnimeApiRequester';
@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage {
  result: any;
  anime: Anime | undefined;
  episodes: Episode[] = [];
  reviews: any[] = [];
  constructor(private route: ActivatedRoute, private animeApiRequester: AnimeApiRequester) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  id: number | null = null;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.searchAnime();
      this.searchEpisodes();
      this.searchReviews();
    });
  }
  async searchAnime() {
    const result = await this.animeApiRequester.getAnimeDetails(this.id!);
    result.data.image_url = result.data.images.jpg.image_url;
    this.anime = result.data;
  }
  async searchEpisodes() {
    const result = await this.animeApiRequester.getAnimeEpisodes(this.id!);
    this.episodes = result.data;
  }
  async searchReviews() {
    const result = await this.animeApiRequester.getAnimeReviews(this.id!);
    this.reviews = result.data;
  }
}

