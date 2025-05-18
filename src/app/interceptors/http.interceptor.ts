import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {


  const authService: AuthService = inject(AuthService);

  // const toastService: ToastrService = inject(ToastrService)


  const token = authService.getAcessToken();

  // const router= inject(Router)



  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })


  }


  return next(req).pipe(

    // retry({ count: 2, delay: 1000 }),

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 0: {


          // toastService.error("Ops! Parece que você está sem internet");


          break;

        }

        case 500:{
          // toastService.error("Ops! Algo inesperado aconteceu");
          break;
        }

        case 403:{
          // sessionStorage.clear()
          // router.navigate([''])
        }
      }

      return throwError(() => error)
    })
  );
};
