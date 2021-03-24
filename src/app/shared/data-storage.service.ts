import { AuthService } from './../auth/auth.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './ingredients';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.module';

import { exhaustMap, map, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipesService: RecipeService,
    private slService: ShoppingListService,
    private authService: AuthService) { }


    saveData(){
      //this.storeShopping().subscribe();
      this.storeRecipes().subscribe();
    }

    fetchData(){
      //this.fetchShopping().subscribe(response =>{console.log(response);});
      this.fetchRecipes().subscribe();
    }

    storeShopping(){
      const ingredients = this.slService.getIngredients();
      return this.http.put("https://recipe-book-angular-project-default-rtdb.firebaseio.com/shopping-list.json", ingredients);
    }

    fetchShopping(){
      return this.http.get<Ingredient[]>("https://recipe-book-angular-project-default-rtdb.firebaseio.com/shopping-list.json")
      .pipe(tap((ingredients =>{
        this.slService.setIngredients(ingredients);
      })))
    }


    storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    //depende de API- usando Firebase
    return this.http.put("https://recipe-book-angular-project-default-rtdb.firebaseio.com/recipes.json",
    recipes)
  }

  fetchRecipes(){

    //depois disso, o observable é completado. Não é preciso fazer unsubscribe manualmente

    return this.http.get<Recipe[]>(
        "https://recipe-book-angular-project-default-rtdb.firebaseio.com/recipes.json"
    ).pipe(
      map(recipes => {// map -> rxjs operator
        return recipes.map(recipe =>{
          //verifica se existem receitas adicionadas. Caso não, array vazio é criado
          return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
        }); // map -> array method*/
      }),
      tap(recipes =>{
        this.recipesService.setRecipes(recipes);
      }));

  }

}
