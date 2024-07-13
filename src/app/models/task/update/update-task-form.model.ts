import { FormControl } from "@angular/forms"

export interface UpdateTaskFormModel {
  id: FormControl<number>
  title:  FormControl<string>
  description:  FormControl<string>
  status:  FormControl<number>
}
