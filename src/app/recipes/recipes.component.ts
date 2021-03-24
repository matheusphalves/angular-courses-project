import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.module';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers: [RecipeService] //somente componentes relacionados com este terão a mesma instância
})
export class RecipiesComponent implements OnInit {


  //@Input() actualRecipe: Recipe = new Recipe("", "", "", [])

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    //recebo informação de alteração na receita
    /*this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.actualRecipe = recipe
      }
    );*/
  }

  onSelectedRecipe(recipe:Recipe){
    //this.actualRecipe = recipe
  }

}
