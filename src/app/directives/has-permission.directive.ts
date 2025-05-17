import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProfileEnum } from '../enums/ProfileEnum';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {

  #templateRef: TemplateRef<any> = inject(TemplateRef);
  #viewContainer: ViewContainerRef = inject(ViewContainerRef);
  #authService: AuthService = inject(AuthService);

  @Input() set hasPermission(perfisPermitidos: ProfileEnum[]) {

    this.#viewContainer.clear();
    const temPermissao = this.#authService.temPermissao(perfisPermitidos);

    if (temPermissao) {
      this.#viewContainer.createEmbeddedView(this.#templateRef);
    }
  }
}
