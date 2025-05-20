import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [provideNgxMask()]
})
export class SignUpComponent {
  form = inject(FormBuilder).group({
    nome: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    cnpj: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f() {
    return this.form.controls;
  }
}
