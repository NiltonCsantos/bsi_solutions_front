import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input()
  text!: string

  @Input()
  quantity!: number

}
