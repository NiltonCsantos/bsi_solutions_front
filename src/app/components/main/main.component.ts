import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AsideComponent } from "../aside/aside.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, AsideComponent, RouterOutlet],
  templateUrl: './main.component.html'
})
export default class MainComponent {

}
