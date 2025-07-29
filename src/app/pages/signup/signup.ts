import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [DefaultLoginLayout, ReactiveFormsModule, PrimaryInput, NgOptimizedImage],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  providers: [LoginService]
})
export class Signup {
  signupForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  submit(){
    this.loginService.login(
      this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe(
      {
        next: () => this.toastService.success("Login feito com sucesso"),
        error: () =>  this.toastService.error("Erro, entre em contato com o suporte"),
      }
    );
  }

  navigate(){
    this.router.navigate(["/login"]);
  }
}
