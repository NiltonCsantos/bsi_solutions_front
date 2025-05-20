import { Component, inject } from '@angular/core';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { RouterLink } from '@angular/router';
import { profileEnum } from '../../enums/enum';

@Component({
  selector: 'app-aside',
  imports: [HasPermissionDirective, RouterLink],
  templateUrl: './aside.component.html'
})
export class AsideComponent {
  protected profile = profileEnum;
}
