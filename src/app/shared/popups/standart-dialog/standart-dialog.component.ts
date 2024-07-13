import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-standart-dialog',
  standalone: true,
  imports: [CommonModule] ,
  templateUrl: './standart-dialog.component.html',
  styleUrl: './standart-dialog.component.css'
})
export class StandartDialogComponent {
  @Output() yesOrNo = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  yesClicked() {
    this.yesOrNo.emit(true)
  }

  noClicked() {
    this.yesOrNo.emit(false)
  }
}

export interface DialogData {
  title?:string;
  message?:string;
  yesText?:string
  yesClass?:string
  noText?:string
  noClass?:string
}
