import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converDate'
})
export class ConverDatePipe implements PipeTransform {

 transform(value: string | Date): string {
    if (!value) return '';

    const data = new Date(value);
    if (isNaN(data.getTime())) return '';

    const diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(data);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2); // pega os dois últimos dígitos do ano

    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${diaSemana}, ${dia}-${mes}-${ano}. ${hora}:${minutos}`;
  }


}
