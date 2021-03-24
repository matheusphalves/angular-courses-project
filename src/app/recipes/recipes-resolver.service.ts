import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.module';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
    private recipeService:RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    //subscribe é feito quando os dados estiverem disponíveis
    const recipes = this.recipeService.getRecipes();

    if(recipes.length === 0 )
      return this.dataStorageService.fetchRecipes();

    return recipes;
  }

}
