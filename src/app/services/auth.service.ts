import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    // console.log(this.isAuthenticated + " getis auth");
    return this.isAuthenticated;
  }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(userName: string, email: string, phone: string, password: string) {
    const user= { userName: userName, email: email, phone: phone, password: password};
    this.http.post<{message: string, result: string}>
    ("http://localhost:3000/api/user/register", user)
    .subscribe((messageData) => {
      console.log(messageData.message); 
    });
  }

  login(userName: string, password: string) {
    const user= {userName: userName, password: password};
    this.http.post<{ expiresIn: number, token: string}>
    ("http://localhost:3000/api/user/login", user)
    .subscribe((response) => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration + " extporation date");

        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(["/items"]);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now =  new Date();
    console.log(authInformation)
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);

    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }


  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return{
        token: token,
        expirationDate: new Date(expirationDate)};
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  getUserById(id: string) {
    return this.http.get<{
      id: string;
      userName: string;
      email: string;
      phone: string;
    }>("http://localhost:3000/api/user/" + id);
  }
  
  getUser() {
    return this.http.get<{
      id: string;
      userName: string;
      email: string;
      phone: string;
    }>("http://localhost:3000/api/user/");
  }

}

