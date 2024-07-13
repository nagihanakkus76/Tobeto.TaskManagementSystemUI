import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-normal-input',
    standalone: true,
    templateUrl: './normal-input.component.html',
    styleUrl: '././normal-input.component.css',
    imports: [ReactiveFormsModule, FormsModule]
})
export class NormalInputComponent {
  @Input() id?: string;
  @Input() label?: string;
  @Input() isRequired?: boolean = false;
  @Input() formControlInput?: FormControl<any>
  @Input() placeholder?: string
  @Input() inputType?:string

  @Output() keyup = new EventEmitter<KeyboardEvent>()

  keyupEmit(event:KeyboardEvent):void {
    this.keyup.emit(event);
  }
}
