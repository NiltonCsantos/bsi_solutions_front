import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from '../../model/auth';
import { Ticket } from '../../model/enterprise';
import { PageResponse } from '../../model/pageResponse';


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

    listTickets(): Observable<PageResponse<Ticket>> {
    return this.httpClient.get<PageResponse<Ticket>>(`${this.url}/chamados`);
  }

}


type userLogin = {
  usuTxEmail: string,
  usuTxSenha: string
}

