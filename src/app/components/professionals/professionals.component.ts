import { Component, inject, OnInit } from '@angular/core';
import { LegendsComponent } from "../shared/legends/legends.component";
import { Professional } from '../../model/admin';
import { ApiService } from '../../services/api/api.service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professionals',
  imports: [LegendsComponent, NgClass, RouterLink],
  templateUrl: './professionals.component.html'
})
export default class ProfessionalsComponent implements OnInit {

  protected professionals: Professional[] | null = null;
  private apiService: ApiService = inject(ApiService);
  protected isHidden: boolean = true;
  protected toastService: ToastrService = inject(ToastrService)
  selectedProfessional: Professional | null = null;

  ngOnInit(): void {
    this.findProfessionals()
  }

  findProfessionals() {
    this.apiService.getProfessionals()
      .subscribe({
        next: (value) => {
          this.professionals = value.response.content
        }
      })
  }

  onToggleClick(event: Event, professional: Professional) {
  event.preventDefault();

  if (professional.usuBlAtivo) {
    // Está ativo e vai tentar desativar → mostra modal
    this.selectedProfessional = professional;
    this.isHidden = false;
  } else {
    // Está inativo → ativa diretamente
    this.managerUser(professional);
  }
}


  disable() {
    this.isHidden = true;
  }

  managerUser(professional: Professional) {

    this.apiService.disableProfessional(professional.proNrId!)
      .subscribe({
        next: () => {
          if (professional.usuBlAtivo) {
            this.toastService.success("Usuario desativado com sucesso")
            professional.usuBlAtivo = false
          } else {
            this.toastService.success("Usuario ativado com sucesso")
            professional.usuBlAtivo = true
          }
          this.isHidden = true
        },
      })

  }

}
