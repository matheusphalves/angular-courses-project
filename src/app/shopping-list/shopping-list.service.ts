import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  //updateList = new EventEmitter<Ingredient[]>()
  updateList = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

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

  getIndredient(index: number){
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.updateList.next(this.getIngredients().slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.updateList.next(this.getIngredients().slice());
    console.log(this.getIngredients())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.updateList.next(this.getIngredients().slice());
  }

}
