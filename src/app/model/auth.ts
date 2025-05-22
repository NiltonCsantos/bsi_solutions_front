import { JwtPayload } from "jwt-decode";
import { profileEnum, TicketEnum } from "../enums/enum";

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
  usuTxAutoridade: profileEnum
}

export interface DecodedToken extends JwtPayload {
  usuario: User
}

export interface TicktesForHistory {
  chaTxTitulo: string,
  chaTxDescricao: string
  usuTxNome: string,
  chaTxImage?:string,
  historicos: History[] | null
}

interface History {
  hicNrId: number,
  hicTxJustificativa: string,
  hicDtAtualizacao: Date,
  hicTxStatus: TicketEnum,
  proTxNome:string
}

export interface Adrdres {
  cep: string;
  localidade: string;
  uf: string;
  munNrId: number;
  estNrId: number;
}

