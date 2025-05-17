import { AfterViewInit, Component } from '@angular/core';
import { SearchComponent } from "../shared/search/search.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SearchComponent, NgClass],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected isVisivel:boolean = false;
  protected isFirstClick: boolean = true;  // Variável para controlar o primeiro clique


  toggle() {
    if (this.isFirstClick) {
      this.isFirstClick = false;  // Após o primeiro clique, desabilita a variável
    }
    this.isVisivel = !this.isVisivel;
  }
}
