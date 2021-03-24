import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    if(this.isLoginMode){
      authObs = this.authService.login(email, password)

    }else{

      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorResponse =>{
      //console.log(errorResponse);
      this.error = errorResponse;
      this.isLoading = false;
    });

    form.reset();
  }
}