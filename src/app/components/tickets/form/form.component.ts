import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LegendsComponent } from "../../shared/legends/legends.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams, Ticket } from '../../../model/enterprise';
import { NgClass } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [LegendsComponent, NgClass, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder)

  private ticket!: Ticket;
  private apiService: ApiService = inject(ApiService);
  protected teams: Teams[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute)
  private toastService: ToastrService = inject(ToastrService);
  private chaNrId?: number
  private router: Router = inject(Router);
  selectedFile: File | null = null;
  protected tickect?:Ticket;
  protected imagemSelecionada: string | null = null;


  protected tickForm = this.fb.group({
    chaTxTitulo: ['', [Validators.minLength(1), Validators.maxLength(256), Validators.required]],
    chaTxDescricao: ['', [Validators.minLength(1), Validators.max(512), Validators.required]],
    eqiNrId: [0, [Validators.min(1)]]
  })

  ngOnInit() {
    this.findTeams();
    this.getPathFromRout()
  }


  saveOrUpdateTicket() {
    const form: Ticket = {
      chaTxDescricao: this.tickForm.value.chaTxDescricao!,
      chaTxTitulo: this.tickForm.value.chaTxTitulo!,
      eqiNrId: this.tickForm.value.eqiNrId!,
      imagem:this.selectedFile
    }

    if (!this.chaNrId) {
      this.apiService.cadastreTicket(form)
        .subscribe({
          next: () => {
            this.toastService.success("chamado criado com sucesso")
          },
        })
    } else {
      this.apiService.updateTicket(form, this.chaNrId)
        .subscribe({
          next: () => {
            this.toastService.success("chamado atualizado com sucesso")
          },

          error: (e: HttpErrorResponse) => {
            this.toastService.error(e.error.response)
          }
        })
    }

    this.router.navigate(["/chamados"])
  }

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
      this.chaNrId = Number(params.get('id'))
      if (this.chaNrId) {
        this.apiService.getTickForId(this.chaNrId)
          .subscribe({
            next: (value) => {
              this.tickect = value.response;
              this.tickForm.patchValue(value.response);
            }
          })
      }
    })
  }

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagemSelecionada = reader.result as string;
    };

    reader.readAsDataURL(file); // Lê o arquivo como base64
  }
}

}
