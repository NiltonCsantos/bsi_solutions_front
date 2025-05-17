import { Component, inject } from '@angular/core';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { ProfileEnum } from '../../enums/ProfileEnum';

@Component({
  selector: 'app-aside',
  imports: [HasPermissionDirective],
  templateUrl: './aside.component.html'
})
export class AsideComponent {
  protected profile = ProfileEnum;
}
