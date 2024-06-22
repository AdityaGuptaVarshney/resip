import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static:false}) slForm: NgForm;
  subscription : Subscription;
  editMode = false;     /*very usefull used in changing the add buttion to update , amd many more*/
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription= this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode= true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })

      }

    );
  }


  constructor(private slService : ShoppingListService) {
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);        /*now access the form object and extract the values*/
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else{

      this.slService.addIngredient(newIngredient);

    }
    this.editMode= false;      /* makes the form not stuck in update mode forever*/
    form.reset();  /*resets the form*/





  }

  onClear(){

    this.slForm.reset();    /*to reset and to reset edit mode */
    this.editMode = false;

  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
