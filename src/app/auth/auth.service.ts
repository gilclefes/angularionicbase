import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";

import { environment } from "./../../environments/environment";
import { LoginRequest } from "./login-request";
import { LoginResult } from "./login-result";
import { LOCAL_STORAGE } from "@ng-web-apis/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenKey: string = "token";
  private emailKey: string = "email";
  private usernameKey: string = "username";
  private roleskey: string = "roles";
  private roles: string[] = [];

  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  constructor(
    protected http: HttpClient,
    @Inject(LOCAL_STORAGE) readonly localStorage: Storage
  ) {}

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getUserRoles(): string[] {
    let roles = localStorage.getItem(this.roleskey);
    if (roles) {
      return JSON.parse(roles);
    }
    return [];
  }

  init(): void {
    if (this.isAuthenticated()) this.setAuthStatus(true);
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes(environment.AdminRole);
  }

  login(item: LoginRequest): Observable<LoginResult> {
    let url = environment.apiUrl + "api/auth/login";
    return this.http.post<LoginResult>(url, item).pipe(
      tap((loginResult) => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          localStorage.setItem(this.usernameKey, loginResult.username);
          localStorage.setItem(this.emailKey, loginResult.email);
          localStorage.setItem(
            this.roleskey,
            JSON.stringify(loginResult.roles)
          ); // Convert roles array to string
          this.setAuthStatus(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.roleskey);
    this.setAuthStatus(false);
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}
