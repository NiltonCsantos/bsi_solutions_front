import { JwtPayload } from "jwt-decode";
import { ProfileEnum } from "../enums/ProfileEnum";
import { TicketEnum } from "../enums/ticketEnum";


export interface AuthData {
  acessToken: string;
  refreshToken: string;
}

export interface UserLogin {
  usuTxEmail: string,
  usuTxSenha: string
}

export interface User {
  usuNrId: number,
  usuTxNome: string,
  usuTxEmail: string,
  usuTxAutoridade: ProfileEnum
}

export interface DecodedToken extends JwtPayload {
  usuario: User
}

export interface TicktesForHistory {
  chaTxTitulo: string,
  chaTxDescricao: string
  usuTxNome: string,
  historicos: History[] | null
}

interface History {
  hicNrId: number,
  hicTxJustificativa: string,
  hicDtAtualizacao: Date,
  hicTxStatus: TicketEnum,
  proTxNome:string
}
