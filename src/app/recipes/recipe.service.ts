import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredients';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.module';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();
  //recipeSelected = new Subject<Recipe>();

  updateRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

 /* private recipes: Recipe[] = [
    new Recipe("Miojo", "É um miojo muito saboroso!", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg",
    [
      new Ingredient('Meat', 2),
      new Ingredient('Banana', 20)
    ]),
    new Recipe("Limonada", "Refrescante", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg",
    [
      new Ingredient('Lemon', 2),
      new Ingredient('Water', 20)
    ]),
    new Recipe("Miojo", "É um miojo muito saboroso!", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg",
    [
      new Ingredient('Chicken', 20),
      new Ingredient('Lemon', 30)
    ]
    )
  ];*/

  constructor(private slService: ShoppingListService,
    private store: Store<{ shoppingList: {ingredients: Ingredient[]} }>){}

  getRecipes(){
    return this.recipes;
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.updateRecipes.next(this.getRecipes().slice());
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  goToShopping(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
      //this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));

  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.updateRecipes.next(this.getRecipes().slice())
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.updateRecipes.next(this.getRecipes().slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.updateRecipes.next(this.getRecipes().slice())

  }
}
