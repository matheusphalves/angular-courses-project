import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  //updateList = new EventEmitter<Ingredient[]>()
  updateList = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [];

  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //this.updateList.emit(this.getIngredients());
    this.updateList.next(this.getIngredients());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    //this.updateList.emit(this.getIngredients().slice());
    this.updateList.next(this.getIngredients().slice());
  }

}
