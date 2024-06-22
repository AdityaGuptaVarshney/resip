import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe.modle";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{

  constructor(private recipeService: RecipeService) {
  }
  @Input() recipe : Recipe;
  @Input() index: number;
  ngOnInit() {
  }


}
