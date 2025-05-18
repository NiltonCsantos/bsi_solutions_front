import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {

  protected contentSearc: string = '';
  protected router: Router = inject(Router);
  @Output()
  searchEmitter: EventEmitter<string> = new EventEmitter();

  search() {

    if (this.router.url !== '/chamados') {
        this.router.navigate(["/chamados"], {
        queryParams: {
          chaTxTitulo: this.contentSearc,
        }
      });
    } else {
      this.router.navigate([], {
        queryParams: {
          chaTxTitulo: this.contentSearc,
        }
      });
    }

  }
}
