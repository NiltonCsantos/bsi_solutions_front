import { TicketEnum } from "../enums/ticketEnum"

export interface Ticket {
  chaNrId?:number
  chaTxDescricao: string
  eqiNrId: number
  chaTxTitulo: string
  chaTxStatus?: TicketEnum,
  chaTxDtAbertura?: string
}


export interface Teams {
  eqiTxNome: string
  eqiNrId: number
}
