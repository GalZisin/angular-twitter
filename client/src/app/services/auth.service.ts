import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAuth, IUser } from '../types/types';
import { retry, catchError } from 'rxjs/operators';
import handleError from '../handleErrors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static baseUrl = 'http://localhost:8000/api';

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuth = this.isAuthenticated.asObservable();

  public user = new BehaviorSubject<IUser>({});
  userData = this.user.asObservable();

  constructor(private http: HttpClient) { }

  login({ email, password }: IAuth): Observable<IUser> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }

    return this.http.post<IUser>(`${AuthService.baseUrl}/auth/login`, { email, password }, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }
  // name: string, email: string, password: string, image: File
  register(fd: FormData): Observable<IUser> {


    console.log("register service image", fd)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true,
      content: fd
    }

    // return this.http.post<IUser>(`${AuthService.baseUrl}/auth/register`, { name, email, password, image }, options)
    return this.http.post<any>(`${AuthService.baseUrl}/auth/register`, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );


  }

  logout(): Observable<any> {

    const options = {
      withCredentials: true
    }

    return this.http.get(`${AuthService.baseUrl}/auth/logout`, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );

  }

  loadUser(): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }

    return this.http.get<any>(`${AuthService.baseUrl}/members/me`, options)
      .pipe(
        retry(1),
        catchError(handleError)

      );
  }

  public authenticate() {
    this.isAuthenticated.next(true);
  }

  public deauthenticate() {
    this.isAuthenticated.next(false);
  }

  public setUser(user: IUser) {
    this.user.next(user)
  }
}