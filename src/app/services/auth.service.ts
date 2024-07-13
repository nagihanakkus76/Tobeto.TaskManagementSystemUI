import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserLoginModel } from "../models/user/user-login.model";
import { UserRegisterModel } from "../models/user/user-register.model";
import { TokenModel } from "../models/token/token.model";
import { Router } from "@angular/router";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LoginResponseModel } from "../models/token/login-response.model";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiControllerUrl = `${environment.apiUrl}/api/Auth`;
  tokenDecode: TokenModel = new TokenModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  register(data: UserRegisterModel): Observable<void> {
    return this.http.post<void>(`${this.apiControllerUrl}/register`, data);
  }

  login(data: UserLoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiControllerUrl}/login`, data);
  }

  isAuthenticated() {
    const token: string | null = this.localStorageService.get("token")

    if (token) {
      const decode: JwtPayload | any = jwtDecode(token);

      const exp = decode.exp;
      const now = new Date().getTime() / 1000;
      if (now > exp) {
        this.localStorageService.remove("token");
        this.localStorageService.remove("userID");
        this.router.navigateByUrl("/login")
        return false;
      }

      const id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.localStorageService.set("userID",id)

      // this.tokenDecode.id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
         this.tokenDecode.userName = decode["Username"];

      return true;
    }

    this.router.navigateByUrl("/login");
    return false;
  }

  logout(){
    this.localStorageService.remove("token");
    this.localStorageService.remove("userID");
    this.router.navigateByUrl("/login");
  }
}
