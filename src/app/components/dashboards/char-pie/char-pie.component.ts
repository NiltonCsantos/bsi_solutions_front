import { Component, inject, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartOptionsPie } from '../../../app.component';
import { QuantityTick, TicketFormTeam } from '../../../model/admin';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-char-pie',
  imports: [NgApexchartsModule],
  templateUrl: './char-pie.component.html',
  standalone: true
})
export class CharPieComponent implements OnInit {

  private api: ApiService = inject(ApiService)

  public chartOptions!: Partial<ChartOptionsPie>;

  quantity!:TicketFormTeam;

ngOnInit(): void {
  this.api.getQuantityTicketForTeam()
    .subscribe({
      next: (value) => {
        this.quantity = value.response;

        this.chartOptions = {
          series: [this.quantity.totalSuporte, this.quantity.totalTecnico],
          labels: ['Suporte', 'Técnica'],
          chart: {
            type: "pie"
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ],
          title: {
            text: "Chamados por equipe"
          }
        };
      },
      error: (err) => {
        console.error('Erro ao buscar os dados do gráfico:', err);
      }
    });
}


  getTicketQuantite() {

  }

}
