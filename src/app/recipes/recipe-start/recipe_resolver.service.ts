import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipe.modle";
import {DataStorageService} from "../../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "../recipe.service";

@Injectable({providedIn: 'root'})
/*resolver is used to run before the route is loaded to ensure that sertain data (which the route depends on ) is there before the route loads  */
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService , private recipesService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0){    /*allow us to change recipes*/
      return this.dataStorageService.fetchRecipes();       /*resolver subscribes on its own to find once data is here*/       /*whenever the resolver runs it reloads the data so that the routes which need it get itttt*/
    }else{
      return recipes;
    }

  }
/*go to app routing module .ts where you have the 2 paths that relys on recipe being loaded. */

}
