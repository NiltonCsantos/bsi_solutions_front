import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsideComponent } from "../aside/aside.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [AsideComponent, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  form = inject(FormBuilder).group({

    email: ['', [Validators.required, Validators.email]],

  });

  get f() {
    return this.form.controls;
  }
}
