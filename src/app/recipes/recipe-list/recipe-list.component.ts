import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.recipeService.updateRecipes.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
        console.log(recipes)
      });
    this.recipes = this.recipeService.getRecipes();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
