import { Component, inject } from '@angular/core';
import { LegendsComponent } from "../../shared/legends/legends.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../../model/enterprise';
import { NgClass } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professional } from '../../../model/admin';

@Component({
  selector: 'app-form',
  imports: [LegendsComponent, ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html'
})
export default class FormComponent {

  private fb: FormBuilder = inject(FormBuilder)
  protected teams: Teams[] = [];
  private apiService: ApiService = inject(ApiService);
  private proNrId?: number
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute)
  private toastService: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.findTeams();
    this.getPathFromRout();
  }

  protected professionalForm = this.fb.group({
    usuTxNome: ['', [Validators.minLength(10), Validators.maxLength(256), Validators.required]],
    proTxCelular: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
    proTxCpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
    usuTxEmail: ['', [Validators.email, Validators.required]],
    eqiNrId: [0, [Validators.min(1)]]
  })



  findTeams(): void {
    this.apiService.listTeans()
      .subscribe({
        next: (value) => {
          this.teams = value.response.content;
        },
      })
  }

  getPathFromRout(): void {
    this.route.paramMap.subscribe(params => {
      this.proNrId = Number(params.get('id'))
      if (this.proNrId) {
        this.apiService.getProfessionalForId(this.proNrId)
          .subscribe({
            next: (value) => {
              console.log(value);
              this.professionalForm.patchValue(value.response);
            },
          })
      }
    })
  }

  saveOrUpdateProfessional() {
    const form: Professional = {
      proTxCelular: this.professionalForm.value.proTxCelular!,
      usuTxNome: this.professionalForm.value.usuTxNome!,
      proTxCpf: this.professionalForm.value.proTxCpf!,
      usuTxEmail: this.professionalForm.value.usuTxEmail!,
      eqiNrId: this.professionalForm.value.eqiNrId!,
    }

    if (!this.proNrId) {
      this.apiService.cadastreProfessional(form)
        .subscribe({
          next: () => {
            this.toastService.success("profissional criado com sucesso")
          },
        })
      setTimeout(() => {
        this.router.navigate(["/chamados/profissionais"])
      }, 1000)
    } else {
      this.apiService.updateProfessional(form, this.proNrId)
        .subscribe({
          next: () => {
            this.toastService.success("profissional atualizado com sucesso")
          },
        })
      setTimeout(() => {
        this.router.navigate(["/chamados/profissionais"])
      }, 1000)
    }
  }

}
