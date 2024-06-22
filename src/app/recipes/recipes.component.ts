import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe.modle";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService],     if you provide it here it well get destroyed when you navigate to other component so provide it in app module /*prividers list is to define a instance of the service on it and its children , to define a single instance for the whole app declare it in app component or the module.ts file*/
})
export class RecipesComponent {

  selectedRecipe: Recipe;
/*
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe; /!*this is used to subscribe for the data of emiiter , () => {} is known as arrow function ie (argument) return=> {function body}*!/
      }
    );
  }*/

}
