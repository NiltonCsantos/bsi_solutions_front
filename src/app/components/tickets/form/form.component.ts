import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LegendsComponent } from "../../shared/legends/legends.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { TeamEnum } from '../../../enums/teamEnum';

@Component({
  selector: 'app-form',
  imports: [RouterLink, LegendsComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent {
  teams: TeamEnum[] = Object.values(TeamEnum);
}
