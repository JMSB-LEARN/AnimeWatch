import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AnimeWatch');
  constructor(private router: Router) { }

  onSimpleSearch(event: { name: string }) {

    this.router.navigate(['/search', event.name]);
  }
}
