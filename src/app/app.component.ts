import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

import {
  ApexChart,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from 'ng-apexcharts';

// Reimportado de apexcharts (se necessário para complementar tipagens)
import { ApexOptions } from 'apexcharts';

export type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

// 🎯 Tipo para gráfico de **Pizza / Donut / RadialBar** (sem eixo)
export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive?: ApexResponsive[];
  title?: ApexTitleSubtitle;
  labels?: any;
};

// 🎯 Tipo para gráfico de **Coluna / Linha / Área** (com eixo)
export type ChartOptionsAxis = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  xaxis?: ApexXAxis;
  grid?: ApexGrid;
  colors?: string[];
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
};


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'bsi_solutions_front';

}
