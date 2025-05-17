import { JwtPayload } from "jwt-decode";
import { ProfileEnum } from "../enums/ProfileEnum";


export interface AuthData {
  acessToken: string;
  refreshToken: string;
}

export interface UserLogin{
  usuTxEmail:string,
  usuTxSenha:string
}

export interface User{
    usuNrId: number,
    usuTxNome: string,
    usuTxEmail: string,
    usuTxAutoridade: ProfileEnum
}

export interface DecodedToken extends JwtPayload {
  usuario: User
}
