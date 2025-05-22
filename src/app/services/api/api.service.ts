import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Adrdres, AuthData, TicktesForHistory, User } from '../../model/auth';
import { EnterPrise, Teams, Ticket } from '../../model/enterprise';
import { PageResponse, ResponseDto } from '../../model/response';
import { cityDto, ManageTicketForm, Professional, QuantityTick, ticketForMonth, TicketFormTeam, TicketForTransfer, TopUser } from '../../model/admin';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { profileEnum } from '../../enums/enum';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = " https://fruitfeira.shop/v1"

  httpClient = inject(HttpClient);

  private local: LocalstorageService = inject(LocalstorageService)

  login(user: userLogin): Observable<AuthData> {
    return this.httpClient.post<AuthData>(`${this.url}/auth/login`, user);
  }

  //geral

  visualizeProgesse(chaNrId: number): Observable<ResponseDto<TicktesForHistory>> {
    return this.httpClient.get<ResponseDto<TicktesForHistory>>(`${this.url}/chamados/historico/${chaNrId}`);
  }

  getCep(cep: string): Observable<ResponseDto<Adrdres>> {
    return this.httpClient.get<ResponseDto<Adrdres>>(`${this.url}/cep/${cep}`);
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
    const formData = new FormData();

    const formObj = {
      chaTxTitulo: form.chaTxTitulo!,
      chaTxDescricao: form.chaTxDescricao!,
      eqiNrId: form.eqiNrId!
    };

    formData.append('form', new Blob([JSON.stringify(formObj)], { type: 'application/json' }));

    if (form.imagem) {
      formData.append('imagem', form.imagem);
    }
    return this.httpClient.post<void>(`${this.url}/chamados`, formData);
  }

  updateTicket(form: Ticket, chaNrId: number): Observable<void> {
    const formData = new FormData();

    const formObj = {
      chaTxTitulo: form.chaTxTitulo!,
      chaTxDescricao: form.chaTxDescricao!,
      eqiNrId: form.eqiNrId!
    };

    formData.append('form', new Blob([JSON.stringify(formObj)], { type: 'application/json' }));


    if (form.imagem) {
      formData.append('imagem', form.imagem);
    }
    return this.httpClient.put<void>(`${this.url}/chamados/${chaNrId}`, formData);
  }

  getTickForId(chaNrId: number): Observable<ResponseDto<Ticket>> {
    return this.httpClient.get<ResponseDto<Ticket>>(`${this.url}/chamados/${chaNrId}`);
  }

  getProfessionalForTicket(chaNrId: number): Observable<ResponseDto<Professional>> {


    return this.httpClient.get<ResponseDto<Professional>>(`${this.url}/profissionais/chamados/${chaNrId}`);
  }


  listTeans(): Observable<PageResponse<Teams>> {
    return this.httpClient.get<PageResponse<Teams>>(`${this.url}/equipes`);
  }

  //#administrador

  getProfessionals(proNrId?:number): Observable<PageResponse<Professional>> {
     const params:any = {};

    if(proNrId){
      params.proNrId = proNrId;
    }
    return this.httpClient.get<PageResponse<Professional>>(`${this.url}/profissionais`, {params});
  }

  getProfessionalForId(proNrId: number): Observable<ResponseDto<Professional>> {
    return this.httpClient.get<ResponseDto<Professional>>(`${this.url}/profissionais/${proNrId}`);
  }

  getQuantityTicet(munNrId?:number): Observable<ResponseDto<QuantityTick>> {
    const params:any = {}
    if(munNrId)
      params.munNrId =munNrId
    return this.httpClient.get<ResponseDto<QuantityTick>>(`${this.url}/chamados/contar`, {params});
  }

  getQuantityTicketForTeam(munNrId?: number): Observable<ResponseDto<TicketFormTeam>> {
    return this.httpClient.get<ResponseDto<TicketFormTeam>>(`${this.url}/chamados/contar-equipe`);
  }

  manageTicket(form: ManageTicketForm): Observable<ResponseDto<void>> {
    return this.httpClient.put<ResponseDto<void>>(`${this.url}/profissionais/gerenciar-chamado`, form);
  }

   TransferTicket(form: TicketForTransfer): Observable<ResponseDto<void>> {
    return this.httpClient.put<ResponseDto<void>>(`${this.url}/chamados/transferir-profissional`, form);
  }

  disableProfessional(proNrId: number): Observable<PageResponse<void>> {
    return this.httpClient.patch<PageResponse<void>>(`${this.url}/profissionais/${proNrId}`, {});
  }

  cadastreProfessional(form: Professional): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/admin/registrar-profissional`, form);
  }

  cadastreEnterprise(form: EnterPrise) {
    return this.httpClient.post<void>(`${this.url}/auth/registrar-empresa`, form);
  }

  updateProfessional(form: Professional, proNrId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/admin/atualizar-profissional/${proNrId}`, form);
  }

  getTicketesProfessionals(munNrId?:number): Observable<PageResponse<TopUser>> {
     const params:any = {}
    if(munNrId)
      params.munNrId =munNrId
    return this.httpClient.get<PageResponse<TopUser>>(`${this.url}/profissionais/mais-chamados`, {params});
  }

  getTicketsForMont(munNrId?: number): Observable<PageResponse<ticketForMonth>> {
    return this.httpClient.get<PageResponse<ticketForMonth>>(`${this.url}/chamados/contar-mes`);
  }

  getCitys(): Observable<PageResponse<cityDto>> {
    return this.httpClient.get<PageResponse<cityDto>>(`${this.url}/cidades`);
  }

}

type userLogin = {
  usuTxEmail: string,
  usuTxSenha: string
}

