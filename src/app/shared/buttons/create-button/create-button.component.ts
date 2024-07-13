import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-button.component.html',
  styleUrl: './create-button.component.css'
})
export class CreateButtonComponent {
  @Input() value?:string;
  @Input() color?:string;
}
