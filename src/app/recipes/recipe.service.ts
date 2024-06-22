import {Recipe} from "./recipe.modle";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()           /*this is used to get a service in a service , you add it where you want the service to be injected in */


export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();        /*just like in shopping list service because we are not showin the exact list , but a copy*/

  // recipeSelected = new EventEmitter<Recipe>(); /*Event emitter is used to emmit a event , the <> specifies which type of data it emits the rest is syntax*/

  //recipeSelected = new Subject<Recipe>();       /*only for @Output we will use event emmiter now ... thats who it works :| */

  // private recipes: Recipe[] = [
  //   new Recipe('Shahi Paneer', 'this is Shahi Paneer ', 'https://myfoodstory.com/wp-content/uploads/2022/04/Shahi-Paneer-1.jpg', [new Ingredient('paneer', 100),new Ingredient('tomato', 200)]),
  //   new Recipe('Gulab Jamun', 'this is Gulab Jamun', 'https://www.funfoodfrolic.com/wp-content/uploads/2020/07/Gulab-Jamun-Thumbnail.jpg', [new Ingredient('sugar', 100),new Ingredient('milk solids', 150)])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());       /*fun to overwrite the recipes array and change it to the copy of the changed recipes*/
  }

  getRecipes() {
/*
    return this.recipes;
*/
    /*array are reference type obj ie if you change something on this array you will change it on the array in this service */
    return this.recipes.slice();   /*therefore .slice() it to make a copy of the one in this service file*/

  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {

    this.slService.addIngredients(ingredients);

  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());    /*this changes the list to the new list of the recipes*/
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe( indeex: number){
    this.recipes.splice( indeex,1);
    this.recipesChanged.next(this.recipes.slice());


  }


}
