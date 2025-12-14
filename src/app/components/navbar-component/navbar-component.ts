import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar-component/search-bar-component';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  @Output() simpleSearchEvent = new EventEmitter<{ name: string }>();
  onSearch(event: { name: string }) {
    this.simpleSearchEvent.emit(event);
  }
}
