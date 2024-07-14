import { FormControl } from "@angular/forms"

export interface AddTaskFormModel {
  title: FormControl<string >
  description: FormControl<string>
  userID: FormControl<number>
}

