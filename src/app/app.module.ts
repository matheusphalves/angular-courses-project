import { AuthModule } from './auth/auth/auth.module';
import { CoreModule } from './core.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoggingService } from './logging.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    //RecipesModule,
    //ShoppingListModule,
    //AuthModule,
    SharedModule,
    CoreModule
  ],
  //providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
