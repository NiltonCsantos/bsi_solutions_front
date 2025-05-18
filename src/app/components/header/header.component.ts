import { AfterViewInit, Component, EventEmitter, inject } from '@angular/core';
import { SearchComponent } from "../shared/search/search.component";
import { NgClass } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [SearchComponent, NgClass, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected isVisivel:boolean = false;
  protected isFirstClick: boolean = true;  // Variável para controlar o primeiro clique
  protected router:Router = inject(Router);
  protected localStorageService:LocalstorageService = inject(LocalstorageService);
  protected auth:AuthService = inject(AuthService);

  toggle() {
    if (this.isFirstClick) {
      this.isFirstClick = false;  // Após o primeiro clique, desabilita a variável
    }
    this.isVisivel = !this.isVisivel;
  }

  logout(){
    this.localStorageService.clearLocalStorage();
    this.router.navigate(["/login"])
  }

}
