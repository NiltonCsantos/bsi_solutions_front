import { Component } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartOptions, ChartOptionsPie } from '../../../app.component';

@Component({
  selector: 'app-char-pie',
  imports: [NgApexchartsModule],
  templateUrl: './char-pie.component.html',
  styleUrl: './char-pie.component.css'
})
export class CharPieComponent {

  public chartOptions: Partial<ChartOptionsPie>;

  constructor() {
    this.chartOptions = {
      series: [44, 55],
      labels: ['Suporte', 'Tecnica'], // <- Aqui você define os títulos das séries
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

  }

}
