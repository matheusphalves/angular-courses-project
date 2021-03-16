import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tipoServico:string = 'recipes'

  constructor(){

  }

  ngOnInit(): void {    
  }
  



  onChangePage(evento: string){
    this.tipoServico = evento
  }

}
