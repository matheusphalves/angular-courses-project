import { AuthComponent } from './auth/auth/auth.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes =   [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},

  //{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
  //versoes recentes:
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
  //pré-carregar módulos
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
