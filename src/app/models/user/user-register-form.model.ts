import { FormControl } from "@angular/forms"

export interface UserRegisterFormModel{
  userName: FormControl<string | null>
  password:  FormControl<string | null>
}
