import { TicketEnum } from "../enums/enum"


export interface Ticket {
  chaNrId?:number
  chaTxDescricao: string
  eqiNrId: number
  chaTxTitulo: string
  chaTxStatus?: TicketEnum,
  chaTxDtAbertura?: string,
  imagem?:File| null
  chaTxImagem?:string
}


export interface Teams {
  eqiTxNome: string
  eqiNrId: number
}

export interface EnterPrise {
  usuTxSenha: string;
  usuTxEmail:string;
  usuTxNome:string;
  empTxCnpj: string;
  empTxCep: string;
  munNrId: number;
}

