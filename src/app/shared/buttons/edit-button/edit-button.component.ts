import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {
  @Input() value?:string;
  @Input() color?:string;
}
