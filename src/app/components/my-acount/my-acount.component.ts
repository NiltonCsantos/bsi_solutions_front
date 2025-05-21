import { Component, inject } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "../shared/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { profileEnum } from '../../enums/enum';

@Component({
  selector: 'app-my-acount',
  standalone: true,
  imports: [
    AsideComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    HasPermissionDirective
  ],
  templateUrl: './my-acount.component.html',
  providers: [provideNgxMask()]
})
export default class MyAcountComponent {

  protected profile = profileEnum

  formConta = inject(FormBuilder).group({
    nome: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    cnpj: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  });

  get f() {
    return this.formConta.controls;
  }
}
