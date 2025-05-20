import { Component, inject, OnInit } from '@angular/core';
import { ChartOptions, ChartOptionsAxis } from '../../../app.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from '../../../services/api/api.service';
import { ticketForMonth } from '../../../model/admin';

@Component({
  selector: 'app-chart-column',
  imports: [NgApexchartsModule],
  templateUrl: './chart-column.component.html',
  styleUrl: './chart-column.component.css'
})
export class ChartColumnComponent implements OnInit {

  public chartOptions!: Partial<ChartOptionsAxis>;
  private api: ApiService = inject(ApiService);


 ngOnInit(): void {
  this.api.getTicketsForMont()
    .subscribe({
      next: (value) => {
        // Preparar os dados para o gráfico
        const dataSeries = value.response.content.map((item: ticketForMonth) => Number(item.totalChamados));
        const categories = value.response.content.map((item: ticketForMonth) => item.mes);

        this.chartOptions = {
          series: [
            {
              name: "Chamados",
              data: dataSeries
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8"
          ],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            show: false
          },
          title: {
            text: "Chamados por mês"
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: [
                  "#008FFB",
                  "#00E396",
                  "#FEB019",
                  "#FF4560",
                  "#775DD0",
                  "#546E7A",
                  "#26a69a",
                  "#D10CE8"
                ],
                fontSize: "12px"
              }
            }
          }
        };
      },
      error: (err) => {
        console.error('Erro ao buscar os dados do gráfico:', err);
      }
    });
}

}
