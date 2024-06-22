import {Component, EventEmitter, OnDestroy, OnInit,} from '@angular/core';
import {Recipe} from "../recipe.modle";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{

  recipes: Recipe[] ;
  subscription : Subscription;

  constructor(private recipeService: RecipeService , private router: Router , private route: ActivatedRoute) {     /*constructor cunstructs the component an for making it it calls the classes , services etc to do so using the constructor function (like calling the raw material for cunstruction :) )*/
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(           /*to destroy subscription*/
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );        /*same as shopping list service this changes the list to the latest copy */
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});    /*we need to talk man .......... see actually we are on the recipe list component which is on the /recipe route so it dosent matter even if a item is selected ie recipe/0 .... navigate() just slapps a /new after the god dammed recipe/ so just load the current route by ActivatedRoute and add it in the navigate function like a little bitch*/
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();


  }


}
