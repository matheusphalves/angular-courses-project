import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() addIngredient = new EventEmitter<Ingredient>()
  //@Output() addIngredient = new Subject<Ingredient>
  @ViewChild("nameInput") nameIngredient: ElementRef;
  @ViewChild("amountInput") amountIngredient: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { 
    this.nameIngredient = new ElementRef("")
    this.amountIngredient = new ElementRef("")
  }

  ngOnInit(): void {
  }

  addAndCheck(){
    const name = this.nameIngredient.nativeElement.value
    const amount = this.amountIngredient.nativeElement.value
    this.shoppingListService.addIngredient(new Ingredient(name, amount))

  }
}
