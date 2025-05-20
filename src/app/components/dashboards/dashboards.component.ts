import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { CharPieComponent } from "./char-pie/char-pie.component";
import { ChartColumnComponent } from "./chart-column/chart-column.component";
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { QuantityTick, TicketFormTeam, TopUser } from '../../model/admin';

@Component({
  selector: 'app-dashboards',
  imports: [ CardComponent, CharPieComponent, ChartColumnComponent],
  templateUrl: './dashboards.component.html'
})
export default class DashboardsComponent implements OnInit{

  private api:ApiService = inject(ApiService)
  private toast:ToastrService = inject(ToastrService);
  protected countQuantityTicket?:QuantityTick
  protected quantityTicketForTeam!:TicketFormTeam
  protected professionals:TopUser[]= []

  ngOnInit(): void {
    this.getTicketQuantite()
    this.getTopProfessionals()
  }


  getTicketQuantite(){
    this.api.getQuantityTicet()
    .subscribe({
      next:(value)=>{
        this.countQuantityTicket = value.response
      }
    })
  }

  getTopProfessionals(){
    this.api.getTicketesProfessionals()
    .subscribe({
      next:(value) =>{
        this.professionals = value.response.content
      }
    })
  }




}
