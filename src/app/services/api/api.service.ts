import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData, TicktesForHistory, User } from '../../model/auth';
import { Teams, Ticket } from '../../model/enterprise';
import { PageResponse, ResponseDto } from '../../model/response';
import { ManageTicketForm, Professional, QuantityTick, ticketForMonth, TicketFormTeam, TopUser } from '../../model/admin';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { profileEnum } from '../../enums/enum';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "https://fruitfeira.shop/v1"

  httpClient = inject(HttpClient);

  private local: LocalstorageService = inject(LocalstorageService)

  login(user: userLogin): Observable<AuthData> {
    return this.httpClient.post<AuthData>(`${this.url}/auth/login`, user);
  }

  //geral

  visualizeProgesse(chaNrId: number): Observable<ResponseDto<TicktesForHistory>> {
    return this.httpClient.get<ResponseDto<TicktesForHistory>>(`${this.url}/chamados/historico/${chaNrId}`);
  }

  //empresa

  listTickets(chaTxTitulo: string): Observable<PageResponse<Ticket>> {
    const params: any = {};

    if (chaTxTitulo !== undefined && chaTxTitulo !== "") {
      params.chaTxTitulo = chaTxTitulo;
    }

    const user: User = JSON.parse(this.local.getItemForLocalStorage("user") as string);
    const professional: Professional = JSON.parse(this.local.getItemForLocalStorage("professional") as string);
    if (user.usuTxAutoridade == profileEnum.ROLE_SUPORTE && professional) {
      params.eqiNrId = professional.eqiNrId
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

  getProfessionalForId(proNrId: number): Observable<ResponseDto<Professional>> {
    return this.httpClient.get<ResponseDto<Professional>>(`${this.url}/profissionais/${proNrId}`);
  }

  getQuantityTicet(): Observable<ResponseDto<QuantityTick>> {
    return this.httpClient.get<ResponseDto<QuantityTick>>(`${this.url}/chamados/contar`);
  }

  getQuantityTicketForTeam(munNrId?: number): Observable<ResponseDto<TicketFormTeam>> {
    return this.httpClient.get<ResponseDto<TicketFormTeam>>(`${this.url}/chamados/contar-equipe`);
  }

  manageTicket(form: ManageTicketForm): Observable<ResponseDto<void>> {
    return this.httpClient.put<ResponseDto<void>>(`${this.url}/profissionais/gerenciar-chamado`, form);
  }

  disableProfessional(proNrId: number): Observable<PageResponse<void>> {
    return this.httpClient.patch<PageResponse<void>>(`${this.url}/profissionais/${proNrId}`, {});
  }

  cadastreProfessional(form: Professional): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/admin/registrar-profissional`, form);
  }

  updateProfessional(form: Professional, proNrId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/admin/atualizar-profissional/${proNrId}`, form);
  }

  getTicketesProfessionals(): Observable<PageResponse<TopUser>> {
    return this.httpClient.get<PageResponse<TopUser>>(`${this.url}/profissionais/mais-chamados`);
  }

   getTicketsForMont(munNrId?:number): Observable<PageResponse<ticketForMonth>> {
    return this.httpClient.get<PageResponse<ticketForMonth>>(`${this.url}/chamados/contar-mes`);
  }

}

type userLogin = {
  usuTxEmail: string,
  usuTxSenha: string
}

