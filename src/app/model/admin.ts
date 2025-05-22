import { TicketEnum } from "../enums/enum"


export interface Professional{
    proNrId?:number
    usuBlAtivo?:boolean
    usuTxNome:string
    perNrId?:number
    perTxNome?:string
    proTxCpf:string,
    proTxCelular:string,
    usuTxEmail:string
    eqiNrId:number,
    equiTxNome?:string
}

export interface QuantityTick {
  totalPedidos: number;
  totalFinalizados: number;
  totalAberto: number;
  totalEmAndamento: number;
  totalCancelado: number;
}


export interface TicketFormTeam {
  totalTecnico: number;
  totalSuporte: number;
}

export interface ManageTicketForm {
  chaNrId: number;
  chaTxStatus: TicketEnum;
  hicTxJustificativa?: string;
}

export interface TopUser {
  usuTxNome: string;
  usuNrId: number;
  totalChamados: number;
}

export interface ticketForMonth {
   mes:string
   totalChamados:number
}

export interface TicketForTransfer{
  chaNrId:number,
  proNrIdAtual:number,
  proNrIdNovo:number
}



export interface cityDto{
  cidTxNome:string,
  cidNrId:number
}
