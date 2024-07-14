import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-bs-toast-success',
  standalone: true,
  imports: [],
  templateUrl: './bs-toast-success.component.html',
  styleUrl: './bs-toast-success.component.scss'
})
export class BsToastSuccessComponent {
  @ViewChild("toasterSuccessEl" ) toaster: ElementRef | undefined
  message:string=""

  show(message:string = "İşlem Başarılı")  {
    if (this.toaster === undefined) return;

    this.message=message;
    const toast = new bootstrap.Toast(this.toaster.nativeElement);
    toast.show();
  }
}
