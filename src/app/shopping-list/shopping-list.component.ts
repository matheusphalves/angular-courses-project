import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  //ingredients: Observable<{ingredients: Ingredient[]}>;
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService,
    private log: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }
  private subscription: Subscription
//store deve receber a mesma chave declarada no appmodule

  ngOnInit(): void {
    //this.ingredients = this.store.select('shoppingList')
    this.ingredients = this.shoppingListService.getIngredients()
    //lista de ingredientes é atualizada
    this.subscription = this.shoppingListService.updateList.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      });

  }

  ngOnDestroy(): void{
    //this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
