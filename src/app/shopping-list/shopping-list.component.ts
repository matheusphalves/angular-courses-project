import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) { }
  private subscription: Subscription
  ngOnInit(): void {
    
    this.ingredients = this.shoppingListService.getIngredients()
    //lista de ingredientes é atualizada
    this.subscription = this.shoppingListService.updateList.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  /*addIngredient(event:Ingredient){
    if(event.name.length>1 && typeof(event.amount) === 'number')
      this.shoppingListService.addIngredient(event)
  }*/

}
