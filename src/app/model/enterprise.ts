import { TicketEnum } from "../enums/ticketEnum"

export interface Ticket{
         chaTxDescricao:string
         eqiNrId:number
         chaTxTitulo:string
         chaTxStatus:TicketEnum,
         chaTxDtAbertura:string
}
