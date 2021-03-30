import { LoggingService } from './logging.service';
import { AuthService } from './auth/auth.service';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private log: LoggingService,
    @Inject(PLATFORM_ID) private platformId){}

  ngOnInit(): void {
    //Angular Universal
    //verifica se código está sendo executado no browser
    if(isPlatformBrowser(this.platformId)){
      this.authService.autoLogin();
    }

    this.log.printLog("Hello frm AppComponent ngOnInit");
  }

}
