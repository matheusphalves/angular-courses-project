
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from './auth/user.model';

import { environment } from './../../environments/environment';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  //opcional, pode não existir
  registered?: boolean;

}

@Injectable({
  providedIn: 'root'
})
//serviço responsável por lidar com autenticações no app
export class AuthService {

  //user = new Subject<User>();
  //retêm o valor anterior
  user = new BehaviorSubject<User>(null);
  tokenExpirationTime: any;


  constructor(private http: HttpClient,
    private router: Router) { }


  signup(email: string, password: string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handlerError),
    tap(resData =>{
      this.handleAuthentication(resData.email,
        resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handlerError),
    tap(resData =>{
      this.handleAuthentication(resData.email,
        resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  autoLogin(){
    //conversão manual
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser = new User(userData['email'],
    userData['id'], userData['_token'],
    new Date(userData['_tokenExpirationDate']));

    //retorna null se token tiver expirado
    if(loadedUser.token){
      const expirationDurantion = new Date(userData['_tokenExpirationDate'])
      /*console.log(expirationDurantion.getTime());
      console.log(new Date().getTime());
      console.log(expirationDurantion.getTime() - new Date().getTime())*/
      this.autoLogout(expirationDurantion.getTime() - new Date().getTime()); //em milisegundos
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDurantion: number){
    //método responsável por invalidar token após expirar
    this.tokenExpirationTime = setTimeout(() =>{
      this.logout();
    }, expirationDurantion);
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth'])
    if(this.tokenExpirationTime){ // se timeout existir
      clearTimeout(this.tokenExpirationTime);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn*1000); //expiresIn está em segundos
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlerError(errorResponse: HttpErrorResponse){
    let errorMessage ='An unknow error occured!';
      //verifica se objeto possui atributos
      if(!errorResponse.error || !errorResponse.error.error){
        return throwError(errorMessage);
      }

      switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists!';
          break;

        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct!'
          break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
      }

      return throwError(errorMessage);
  }

}
