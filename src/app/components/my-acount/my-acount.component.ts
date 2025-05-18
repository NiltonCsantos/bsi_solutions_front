import { Component } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-acount',
  imports: [AsideComponent, HeaderComponent, RouterOutlet],
  templateUrl: './my-acount.component.html'
})
export default class MyAcountComponent {

}
