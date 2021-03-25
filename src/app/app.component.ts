import { LoggingService } from './logging.service';
import { AuthService } from './auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService,
    private log: LoggingService){}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.log.printLog("Hello frm AppComponent ngOnInit");
  }

}
