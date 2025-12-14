import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  name: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.route.paramMap.subscribe(params => {
      const criteria: { name: string, sfw: boolean, status: string } = { name: '', sfw: false, status: 'Airing' };
      this.name = params.get('name');
      criteria.name = this.name!;
      criteria.status = "";
      this.searchCriteria = criteria;
    });
  }
}
