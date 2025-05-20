import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { DecodedToken, User, UserLogin } from "../../model/auth";
import { LocalstorageService } from "../localstorage/localstorage.service";
import { Router } from "@angular/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { profileEnum } from "../../enums/enum";



@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiService = inject(ApiService);
  private localStorageService = inject(LocalstorageService);
  private router: Router = inject(Router);


  temPermissao(perfisPermitidos: profileEnum[]): boolean {
    return perfisPermitidos.includes(this.getUser()!.usuTxAutoridade);
  }

  login(userLogin: UserLogin): void {
    this.apiService.login(userLogin).subscribe({
      next: (value) => {

        this.setAcessToken(value.acessToken);
        this.setRefreshToken(value.refreshToken);
        if (this.getUser()?.usuTxAutoridade == profileEnum.ROLE_SUPORTE) {
          this.getProfessional();
        }
        this.navigateToTickets()

      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        // this.toastService.error(e.error.message)
      }
    })
  }

  getProfessional() {
    this.apiService.getProfessionalForId(this.getUser()?.usuNrId!)
      .subscribe({
        next: (value) => {
          this.localStorageService.setItemForLocalStorage("professional", JSON.stringify(value.response));
        },
      })
  }

  setAcessToken(acessToken: string): void {
    const decode: DecodedToken = jwtDecode(acessToken);
    this.setUser(decode)
    this.localStorageService.setItemForLocalStorage("acessToken", acessToken)
  }
  getAcessToken(): string | null {
    const token: string | null = this.localStorageService.getItemForLocalStorage("acessToken")
    return token;
  }
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem("refreshToken", refreshToken)
  }
  getRefreshToken(refreshToken: string): string | null {
    return this.localStorageService.getItemForLocalStorage("refreshToken")
  }
  navigateToTickets(): void {
    this.router.navigate(['/chamados'])
  }

  setUser(user: DecodedToken): void {
    this.localStorageService.setItemForLocalStorage("user", JSON.stringify(user.usuario))
  }

  getUser(): User | null {

    const user: string | null = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return null
    }
  }
}
