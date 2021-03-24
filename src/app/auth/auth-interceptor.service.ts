
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      //usuario logado, efetuar requisição, aplicar map pra obter as receitas

    return this.authService.user.pipe(
      take(1),//extraído usuário autenticado
      exhaustMap(user =>{  //exhaust map -> recebe observable do take e é retornado um novo observable com a função executada

        if(!user){ //caso não exista usuário, não efetuar alterações na requisição
          return next.handle(req);
        }

        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
        //adição do token nas requisições
        return next.handle(modifiedReq);
    }))

  }
}
