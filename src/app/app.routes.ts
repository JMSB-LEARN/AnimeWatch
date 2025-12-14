import { Routes } from '@angular/router';
import { DetailsPage } from './pages/details-page/details-page';
import { HomePage } from './pages/home-page/home-page';
import { MyAnimesPage } from './pages/my-animes-page/my-animes-page';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'anime/:id', component: DetailsPage },
    { path: 'my-animes', component: MyAnimesPage },
    { path: 'search', component: SearchPage }
];
