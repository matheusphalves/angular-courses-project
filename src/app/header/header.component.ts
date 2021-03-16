import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() buttonEvent = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  clicado(evento:string){
    this.buttonEvent.emit(evento)
  }

}
