import {Subject} from "rxjs";
import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{

  ingredientsChange = new Subject<Ingredient[]>();      /*bhai yar 1 gante ka observable ka natak hua aur bas sala event emitter ko subject se replace kar paye .... aur .emit() ko next() se  change kar paye*/
  startedEditing = new Subject<number>();

  /*
  ingredientsChange = new EventEmitter<Ingredient[]>();               bheti hawa sa tha vo .... udti patang sa tha vo .... kahagaya use duhondo
*/

  private ingredients: Ingredient[] = [
    new Ingredient('Paneer',100),
    new Ingredient('tomato',120)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];

  }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
    // this.ingredientsChange.emit(this.ingredients.slice());                  emit => next for nothing changes at all :[
  }

  addIngredients(ingredients: Ingredient[]){

    /*for (let ingredient of ingredients){
      this.addIngredient(ingredient);*/


    this.ingredients.push(...ingredients); /*this ... is a spred method which converts a list of items to just items so that they could be pusshed in ingredients individualy and not as a list */
    this.ingredientsChange.next(this.ingredients.slice());
    // this.ingredientsChange.emit(this.ingredients.slice());

  }

  updateIngredient(index: number ,  newIngredient: Ingredient){

    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());

  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }





}
