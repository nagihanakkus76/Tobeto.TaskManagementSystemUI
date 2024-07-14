import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { BsToastErrorComponent } from '../../../shared/alerts/bs-toast-error/bs-toast-error.component';
import { BsToastSuccessComponent } from '../../../shared/alerts/bs-toast-success/bs-toast-success.component';
import { map, switchMap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, BsToastErrorComponent,BsToastSuccessComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  @ViewChild("password") password: ElementRef<HTMLInputElement> | undefined
  @ViewChild(BsToastErrorComponent) toastError: BsToastErrorComponent
  @ViewChild(BsToastSuccessComponent) toastSuccess: BsToastSuccessComponent

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userName: [""],
      password: [""]
    })
  }

  showOrHidePassword() {
    if (this.password === undefined) return;

    if (this.password?.nativeElement.type === "password") {
      this.password.nativeElement.type = "text";
    } else {
      this.password.nativeElement.type = "password";
    }
  }


  login() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.localStorageService.set("token", res.token);
      this.authService.isAuthenticated()

      this.toastSuccess.show("Giriş Başarılı")
      setTimeout(() => {
        this.router.navigateByUrl("/home");
      }, 1000);
    },
      (err:HttpErrorResponse) => {
        this.toastError.show(err.error.Detail)
      }
    )




  }

}
