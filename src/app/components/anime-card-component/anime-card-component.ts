import { Component, Input } from '@angular/core';
import { Anime } from '../../models/Anime';
import { Router } from '@angular/router';
@Component({
  selector: 'app-anime-card-component',
  imports: [],
  templateUrl: './anime-card-component.html',
  styleUrl: './anime-card-component.css',
})
export class AnimeCardComponent {
  @Input() animeInfo: Anime | undefined;
  constructor(private router: Router) {
  }
  navigateToDetails() {
    if (this.animeInfo) {
      this.router.navigate(['/anime', this.animeInfo.id]);
    }
  }
}
