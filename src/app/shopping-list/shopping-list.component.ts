import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    
    this.ingredients = this.shoppingListService.getIngredients()
    //lista de ingredientes é atualizada
    this.shoppingListService.updateList.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
        console.log(this.ingredients)
      });
  }

  /*addIngredient(event:Ingredient){
    if(event.name.length>1 && typeof(event.amount) === 'number')
      this.shoppingListService.addIngredient(event)
  }*/

}
