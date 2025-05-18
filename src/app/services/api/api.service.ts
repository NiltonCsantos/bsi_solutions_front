import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from '../../model/auth';
import { Teams, Ticket } from '../../model/enterprise';
import { PageResponse, ResponseDto } from '../../model/response';
import { Professional } from '../../model/admin';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/v1"

  httpClient = inject(HttpClient);

  login(user: userLogin): Observable<AuthData> {
    return this.httpClient.post<AuthData>(`${this.url}/auth/login`, user);
  }

  //empresa

  listTickets(chaTxTitulo: string): Observable<PageResponse<Ticket>> {
    const params: any = {};

    if (chaTxTitulo !== undefined && chaTxTitulo !== "") {
      params.chaTxTitulo = chaTxTitulo;
    }

    return this.httpClient.get<PageResponse<Ticket>>(`${this.url}/chamados`, { params });

  }

  cadastreTicket(form: Ticket): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/chamados`, form);
  }

  updateTicket(form: Ticket, chaNrId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/chamados/${chaNrId}`, form);
  }

  getTickForId(chaNrId: number): Observable<ResponseDto<Ticket>> {
    return this.httpClient.get<ResponseDto<Ticket>>(`${this.url}/chamados/${chaNrId}`);
  }


  listTeans(): Observable<PageResponse<Teams>> {
    return this.httpClient.get<PageResponse<Teams>>(`${this.url}/equipes`);
  }

  //#administrador

  getProfessionals(): Observable<PageResponse<Professional>> {
    return this.httpClient.get<PageResponse<Professional>>(`${this.url}/profissionais`);
  }

    getProfessionalForId(proNrId:number): Observable<ResponseDto<Professional>> {
    return this.httpClient.get<ResponseDto<Professional>>(`${this.url}/profissionais/${proNrId}`);
  }



  disableProfessional(proNrId: number): Observable<PageResponse<void>> {
    return this.httpClient.patch<PageResponse<void>>(`${this.url}/profissionais/${proNrId}`, {});
  }

  cadastreProfessional(form: Professional): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/admin/registrar-profissional`, form);
  }

  updateProfessional(form: Professional, proNrId:number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/admin/atualizar-profissional/${proNrId}`, form);
  }

}

type userLogin = {
  usuTxEmail: string,
  usuTxSenha: string
}

