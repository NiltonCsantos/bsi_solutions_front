import { Component, inject, OnInit } from '@angular/core';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { ProfileEnum } from '../../enums/ProfileEnum';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LegendsComponent } from "../shared/legends/legends.component";
import { ApiService } from '../../services/api/api.service';
import { Ticket } from '../../model/enterprise';
import { TicketEnum } from '../../enums/ticketEnum';
import { NgClass, NgStyle } from '@angular/common';
import { ConverDatePipe } from '../../pipes/conver-date.pipe';

@Component({
  selector: 'app-tickets',
  imports: [HasPermissionDirective, RouterLink, LegendsComponent, NgStyle, ConverDatePipe, NgClass],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export default class TicketsComponent implements OnInit {

  protected profile = ProfileEnum;
  protected apiService: ApiService = inject(ApiService);
  protected hoveredIndex: number | null = null;
  protected tickets: Ticket[] = []
  isHidden: boolean = true
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute)

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
}
