import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients';
import { Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm
  @Output() addIngredient = new EventEmitter<Ingredient>()
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription
  editedItem: Ingredient
  //@Output() addIngredient = new Subject<Ingredient>
  //@ViewChild("nameInput") nameIngredient: ElementRef;
  //@ViewChild("amountInput") amountIngredient: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { 
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index; //recebo o index do elemento que será editado
        this.editedItem = this.shoppingListService.getIndredient(this.editedItemIndex)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }


  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else
      this.shoppingListService.addIngredient(newIngredient)

    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    if(this.editMode){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear(); 
    }

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
}
