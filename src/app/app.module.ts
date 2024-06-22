import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent} from "./header/header.component";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RouterModule,Routes} from "@angular/router";
import {RecipeService} from "./recipes/recipe.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent                                         /*you can add both component and directive*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,                    /*for making reactive forms for recipe edit*/
    HttpClientModule,                        /*for making http requests to the server*/
    AppRoutingModule ,                       /*with this routuing was added to angular now go to app component */


  ],
  providers: [ShoppingListService, RecipeService],       /*by adding recipeserviece you ensure that it always survives */
  bootstrap: [AppComponent]
})
export class AppModule { }
