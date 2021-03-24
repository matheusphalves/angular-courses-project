import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations:[AuthComponent],
  imports:[
    FormsModule,
    SharedModule,
    RouterModule.forChild([{path: 'auth', component: AuthComponent}])
  ],
  exports:[AuthComponent]
})
export class AuthModule{}
