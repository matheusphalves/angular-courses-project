import { PlaceholderDirective } from './../../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../../shared/alert/alert/alert.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  closeSub: Subscription

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }

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
      //this.error = errorResponse;
      this.showErrorAlert(errorResponse);
      this.isLoading = false;
    });

    form.reset();
  }

  private showErrorAlert(errorResponse: string){
    //Não funciona, objeto js normal
    //const alertComp = new AlertComponent();
    const alertCmpFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorResponse;
    this.closeSub = componentRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }


  onHandleError(){
    this.error = null;
  }
}
