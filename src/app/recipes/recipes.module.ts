import { RecipesRoutingModule } from './recipes-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from './recipe-edit/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipiesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  exports: []
})
export class RecipesModule { }
