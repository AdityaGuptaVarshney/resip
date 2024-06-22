import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.modle";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id : number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {      /*route is used to get the route of the current component */
  }

  ngOnInit() {
/*
    const id = this.route.snapshot.params['id'];              works only one time
*/
    this.route.params.subscribe(
      (params: Params) => { this.id = +params['id']; /*SUBSCRIBE  to the params observable and the plus + is to make string to number*/
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){

    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

  onEditRecipe(){

    this.router.navigate(['edit'], {relativeTo: this.route});
/*
    this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});              why the fuck would you do that man........... it the same just fogget about it
*/

  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
