import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService,
    private log: LoggingService) { }
  private subscription: Subscription
  ngOnInit(): void {

    this.ingredients = this.shoppingListService.getIngredients()
    //lista de ingredientes é atualizada
    this.subscription = this.shoppingListService.updateList.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      });

      this.log.printLog("Hello from ShoppingListComponent ngOnInit");
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
