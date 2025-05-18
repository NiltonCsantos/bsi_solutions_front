import { Component, inject } from '@angular/core';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { ProfileEnum } from '../../enums/ProfileEnum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [HasPermissionDirective, RouterLink],
  templateUrl: './aside.component.html'
})
export class AsideComponent {
  protected profile = ProfileEnum;
}
