import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { UserLogin } from '../../../model/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-form',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {


    private userLogin!:UserLogin;
    private fb:FormBuilder = inject(FormBuilder)
    private authService:AuthService = inject(AuthService)

  protected loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]]
  })

  protected login():void{

    this.userLogin ={
      usuTxEmail:this.loginForm.value.email!,
      usuTxSenha: this.loginForm.value.password!
    }

    this.authService.login(this.userLogin)
  }

}
