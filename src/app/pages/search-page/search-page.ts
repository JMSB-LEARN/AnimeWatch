import { Component, Input } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form-component/search-form-component';
import { ShowAnimeCardsComponent } from '../../components/show-anime-cards-component/show-anime-cards-component';

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent, ShowAnimeCardsComponent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})

export class SearchPage {
  searchCriteria: { name: string, sfw: boolean, status: string } = { name: '', sfw: false, status: 'Airing' };

  onSearch(criteria: { name: string, sfw: boolean, status: string }) {
    this.searchCriteria = criteria;
  }
}
