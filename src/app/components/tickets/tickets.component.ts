import { Component, inject, OnInit } from '@angular/core';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LegendsComponent } from "../shared/legends/legends.component";
import { ApiService } from '../../services/api/api.service';
import { Ticket } from '../../model/enterprise';
import { NgClass, NgStyle } from '@angular/common';
import { ConverDatePipe } from '../../pipes/conver-date.pipe';
import { TicktesForHistory } from '../../model/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ManageTicketForm, Professional } from '../../model/admin';
import { FormsModule } from '@angular/forms';
import { profileEnum, TicketEnum } from '../../enums/enum';

@Component({
  selector: 'app-tickets',
  imports: [HasPermissionDirective, RouterLink, LegendsComponent, NgStyle, ConverDatePipe, NgClass, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export default class TicketsComponent implements OnInit {

  protected profile = profileEnum;
  protected apiService: ApiService = inject(ApiService);
  protected hoveredIndex: number | null = null;
  protected tickets: Ticket[] = []
  isHidden: boolean = true
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute)
  protected isPopupHidden: boolean = true;
  protected isPopupCancelHidden: boolean = true;
  protected isPopupTransferHidden: boolean = true;
  protected ticketWithHistory?: TicktesForHistory;
  protected toastService: ToastrService = inject(ToastrService)
  protected ticketForm!: Ticket
  protected status = TicketEnum;
  protected description:string = ""
  protected professional?:Professional
  protected proTxNome:string = "";
  protected professionals:Professional[] = []
  protected proNrIdNovo!:number


  ngOnInit(): void {
    this.getTicket();
  }

  getTicket() {

    this.route.queryParams.subscribe(params => {
      const chaTxTitulo = params['chaTxTitulo'];  // nome do parâmetro que quer extrair

      this.apiService.listTickets(chaTxTitulo)
        .subscribe({
          next: (value) => {
            this.tickets = value.response.content;
          },
        })
    });

  }

  getStatus(ticketStatus: TicketEnum): string {
    const statusMap: Map<TicketEnum, string> = new Map();
    statusMap.set(TicketEnum.ABERTO, "#3498db");        // Azul
    statusMap.set(TicketEnum.ALTERADO, "#9b59b6");      // Roxo
    statusMap.set(TicketEnum.EM_ANDAMENTO, "#f1c40f");  // Amarelo
    statusMap.set(TicketEnum.CANCELADO, "#e74c3c");     // Vermelho
    statusMap.set(TicketEnum.CONCLUIDO, "#2ecc71");     // Verde

    return statusMap.get(ticketStatus)!.valueOf();
  }

  toggleVisible() {
    this.isHidden = !this.isHidden
  }

  closePopup() {
    this.isPopupHidden = true
  }

   closePopupFormCancel() {
    this.isPopupCancelHidden = true
  }

  viewPopup(chaNrID: number) {
    this.apiService.visualizeProgesse(chaNrID)
      .subscribe({
        next: (value) => {
          this.ticketWithHistory = value.response
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.response)
        }
      })
    this.isPopupHidden = false;
  }

  manageTicket(ticket: Ticket, chaTxStatus: TicketEnum, hicTxJustificativa?: string) {

    const form: ManageTicketForm = {
      chaTxStatus: chaTxStatus,
      chaNrId: ticket.chaNrId!,
      hicTxJustificativa: hicTxJustificativa
    }

    this.apiService.manageTicket(form)
      .subscribe({
        next: () => {
          this.toastService.success("Chamado atualizado.")
          this.isPopupHidden = true;
          this.getTicket()
        }
      })
  }

  updateTicketForm(ticket: Ticket) {
    this.ticketForm = ticket;
  }

  cancelTicket() {
    this.isPopupCancelHidden = false;
  }

  closePopupTransfer(){
    this.isPopupTransferHidden = true;
  }

  openPopupTransfer(ticket:Ticket){
    this.ticketForm = ticket;
    this.apiService.getProfessionalForTicket(ticket.chaNrId!)
    .subscribe(
      {
        next:(value)=>{
          this.professional = value.response
          this.proTxNome = value.response.usuTxNome
          this.apiService.getProfessionals(this.professional?.proNrId)
          .subscribe({
            next:(value)=>{
              this.professionals = value.response.content;
            }
          })
        }
      }
    )
    this.isPopupTransferHidden = false
  }

  transferTicket(){
    this.apiService.TransferTicket({chaNrId:this.ticketForm.chaNrId!, proNrIdAtual:this.professional!.proNrId!, proNrIdNovo:this.proNrIdNovo})
    .subscribe({
      next:()=>{
        this.isPopupTransferHidden = true;
        this.toastService.success("Transferencia realizada com sucesso")
      },
      error:(e:HttpErrorResponse)=>{
          console.log(e);
          if (e.error.fields) {
            e.error.fields.map((field: any) =>
              this.toastService.error(field.fieldErrorMessage)
            )
          }else{
              this.toastService.error(e.error.message);
          }
      }
    })
  }
}
