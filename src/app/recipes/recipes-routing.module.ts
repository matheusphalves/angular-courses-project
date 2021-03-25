import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RecipiesComponent } from "./recipes.component";
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
//deve começar vazio, visto q estamos usando lazy loading
//pra carregar o módulo quando a rota em app-routing for acionada
const routes  = [
  {path: '', component: RecipiesComponent,
  canActivate:[AuthGuard] , children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}

)
export class RecipesRoutingModule{}
