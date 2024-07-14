import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-bs-toast-error',
  standalone: true,
  imports: [],
  templateUrl: './bs-toast-error.component.html',
  styleUrl: './bs-toast-error.component.scss'
})
export class BsToastErrorComponent {
  @ViewChild("toasterErrorEl" ) toaster: ElementRef | undefined
  message:string=""

  show(message:string = "İşlem Başarısız")  {
    if (this.toaster === undefined) return;

    this.message=message;
    const toast = new bootstrap.Toast(this.toaster.nativeElement);
    toast.show();
  }
}
