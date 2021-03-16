import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Recipe } from './../recipe.module';
import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  @Input() recipeDetail: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  goToShopping(){
    //console.log(this.recipeDetail.ingredients)
    this.recipeService.goToShopping(this.recipeDetail.ingredients);
  }

}
