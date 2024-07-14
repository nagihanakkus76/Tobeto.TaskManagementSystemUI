import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { BsToastSuccessComponent } from '../../../shared/alerts/bs-toast-success/bs-toast-success.component';
import { BsToastErrorComponent } from '../../../shared/alerts/bs-toast-error/bs-toast-error.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule,BsToastSuccessComponent,BsToastErrorComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  @ViewChild("password") password: ElementRef<HTMLInputElement> | undefined
  @ViewChild(BsToastSuccessComponent) toastSuccess: BsToastSuccessComponent
  @ViewChild(BsToastErrorComponent) toastError: BsToastErrorComponent


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
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

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (res) => {
        this.toastSuccess.show("Kayıt Başarılı.")
        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 1000);
      },
      (err:HttpErrorResponse)=>{

        this.toastError.show(err.error.Detail)
      }

    )
  }
}
