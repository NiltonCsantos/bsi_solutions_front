import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legends',
  imports: [RouterLink],
  templateUrl: './legends.component.html'
})
export class LegendsComponent {

  @Input()
  title:string = "";
  @Input()
  textButton:string="";
  @Input()
  pathRoute:string=""

}
