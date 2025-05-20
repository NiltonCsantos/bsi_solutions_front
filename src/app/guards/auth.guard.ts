import { CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { DecodedToken } from '../model/auth';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService)
  const token: string | null = authService.getAcessToken();

  if (token) {
    const decode: DecodedToken = jwtDecode(token);
    if (decode.exp!= undefined && decode.exp <Date.now() / 1000) {
      return false;
    }
    return true
  } else {
    return inject(Router).createUrlTree(["/login"])
  }
};
