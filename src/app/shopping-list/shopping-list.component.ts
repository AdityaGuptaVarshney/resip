import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private igChangeSub : Subscription;                /*store the subject as a subscription to unsubscribe it */

  constructor(private slService: ShoppingListService ) {
  }

  ngOnInit() {
    this.ingredients= this.slService.getIngredients(); /*all initialisations in ngoninit */
    this.igChangeSub = this.slService.ingredientsChange.subscribe(           /*this subscription is stored in a local instance igchangsub*/
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();                 /*allways unsubscribe to the obserbable after use*/
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);



  }


}
