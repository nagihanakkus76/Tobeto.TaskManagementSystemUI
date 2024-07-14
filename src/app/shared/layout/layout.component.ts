import { Component } from '@angular/core';
import { LogoutButtonComponent } from "../buttons/logout-button/logout-button.component";
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LogoutButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  userName: string = ""

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.userName = localStorageService.get("userName") ?? "-"
  }
}
