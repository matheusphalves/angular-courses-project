import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit/recipe-edit.component';


const routes: Routes =   [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipiesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
