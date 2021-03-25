import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients';
//import { AddIngredient, ADD_INGREDIENT } from './shopping-list.actions';
//import de tudo deste arquivo, declarado apelido
import * as ShoppingListActions from './shopping-list.actions';

//Estado inicial, deve ser um objeto js
const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
]
};

//default values
//state é imutável
export function shoppingListReducer(state = initialState,
  action: ShoppingListActions.ShoppingListActions){

    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };

      default:
        return state;
    }
}
