import { AuthService } from './auth.service';
import { User } from './auth/user.model';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService:AuthService,
    private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //dessa forma, classe não fica inscrita o tempo todo no usuário
    return this.authService.user.pipe(
      take(1)
      ,map(user => {
      const isAuth = !!user;
      if(isAuth){
        return true;
      }

      return this.router.createUrlTree(['/auth']); //retornamos se existe um usuário logado
    }))
  }

}
