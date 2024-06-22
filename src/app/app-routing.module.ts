import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipes/recipe-start/recipe_resolver.service";

/*for routing we can do this in app.module.ts or create a new app-routing.module.ts with the same NGmodule*/

const appRoutes: Routes = [                                /* 1)  first make a const of type Routes to make routes for your app */
  {path: '' , redirectTo: '/recipes' ,  pathMatch: 'full'},   /*as '' is part of every path ,we use path match to specify */
  { path : 'recipes' , component: RecipesComponent, children: [       /*this is how you make child routes for a component now go to Recipes component.html and add router outlet*/
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      /*go to app routing module .ts where you have the 2 paths that relys on recipe being loaded for resolve ; []. */

      {path: ':id' ,
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]

      },            /*this adds a dynamic route ie /recipes/1 or 2 or 3 etc */
      /*{path: 'new', component: RecipeEditComponent},                all the dynamic route should be at last as the cli parses the list vertically and there is no recipe with id 'new'*/
      {path: ':id/edit',
        component: RecipeEditComponent ,
        resolve: [RecipeResolverService] },
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},

]  /*the error is bs*/

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],                 /*2 ) then import RouterModule and feed in  the appRoutes in the forroot function */
  exports: [RouterModule]                                      /* 3 ) after import export the routerModule to the app.module.ts */

})

export class AppRoutingModule{

}
