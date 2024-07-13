import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.css'
})
export class CancelButtonComponent {
  @Input() value?:string;
  @Input() color?:string;
}
