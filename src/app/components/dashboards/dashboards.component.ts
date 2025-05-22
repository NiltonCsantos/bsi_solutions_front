import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { CharPieComponent } from "./char-pie/char-pie.component";
import { ChartColumnComponent } from "./chart-column/chart-column.component";
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { cityDto, QuantityTick, TicketFormTeam, TopUser } from '../../model/admin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboards',
  imports: [CardComponent, CharPieComponent, ChartColumnComponent, FormsModule],
  templateUrl: './dashboards.component.html'
})
export default class DashboardsComponent implements OnInit {

  private api: ApiService = inject(ApiService)
  private toast: ToastrService = inject(ToastrService);
  protected countQuantityTicket?: QuantityTick
  protected quantityTicketForTeam!: TicketFormTeam
  protected professionals: TopUser[] = []
  protected cities: cityDto[] = []
  protected cityNrId: number | undefined = undefined;

  ngOnInit(): void {
    this.getTicketQuantite()
    this.getTopProfessionals()
    this.getCitys()
  }


  getTicketQuantite() {
    this.api.getQuantityTicet(this.cityNrId)
      .subscribe({
        next: (value) => {
          this.countQuantityTicket = value.response
        }
      })
  }

  getTopProfessionals() {
    this.api.getTicketesProfessionals(this.cityNrId)
      .subscribe({
        next: (value) => {
          this.professionals = value.response.content
        }
      })
  }

  getCitys(munNrId?: number) {

    this.api.getCitys()
      .subscribe(
        {
          next: (value) => {
            console.log(value.response.content);
            this.cities = value.response.content
          }
        }
      )
  }

  handleChange() {
    this.getTicketQuantite()
    this.getTopProfessionals()
  }




}
