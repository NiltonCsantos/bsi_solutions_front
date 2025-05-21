import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { EnterPrise } from '../../model/enterprise';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [provideNgxMask()]
})
export class SignUpComponent {

  private api: ApiService = inject(ApiService);
  private toast: ToastrService = inject(ToastrService);
  private router:Router = inject(Router);

  form = inject(FormBuilder).group({
    nome: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    cnpj: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    municipio: [''],
    munNrId: [0, [Validators.min(1), Validators.required]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f() {
    return this.form.controls;
  }


  chanceCep() {
    const cep = this.form.get('cep')!.value;

    if (cep?.length == 8) {
      this.api.getCep(cep)
        .subscribe({
          next: (value) => {
            this.form.patchValue({ municipio: value.response.localidade, munNrId: value.response.munNrId });
          }
        })
    }

  }

  saveEnterprise() {
    const enterPrise: EnterPrise = {
      empTxCep: this.form.value.cep!,
      empTxCnpj: this.form.value.cnpj!,
      munNrId: this.form.value.munNrId!,
      usuTxSenha: this.form.value.senha!,
      usuTxEmail: this.form.value.email!,
      usuTxNome: this.form.value.nome!
    }

    console.log(enterPrise);


    this.api.cadastreEnterprise(enterPrise)
      .subscribe({
        next: (value) => {
          this.toast.success("Empresa cadastrada! Acesse seu email para ativar usuário")
          this.router.navigate(["/login"])
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          if (e.error.fields) {
            e.error.fields.map((field: any) =>
              this.toast.error(field.fieldErrorMessage)
            )
          }else{
              this.toast.error(e.error.message);
          }
        }
      })
  }
}
