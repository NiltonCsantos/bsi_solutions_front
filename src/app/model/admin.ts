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

