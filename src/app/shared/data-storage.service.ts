import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.modle";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn:'root'})   /*shortcut to add in app.module.ts providers list*/
export class DataStorageService{

  constructor(private http : HttpClient, private recipeService: RecipeService) {             /*after importing http client module in app.module.ts construct this class using http : Httpclient*/
  }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();   /*stores all the data in recipes*/
    this.http.put('https://ng-course-recipe-book-1ed1e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes).subscribe(response=>{
      console.log(response);
    }); /*put function is used to send and overide the data , in /recipes.json recipes is a node , folder created in firebase and adding .json is firebase requirement  */
/*but this http req will only work if we .subscribe to it either in here or in other component using , return this.http.put('https://ng-course-recipe-book-1ed1e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes); and calling this service */
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-1ed1e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {            /*here map is an rxjs operator*/
        return recipes.map(recipe => {       /*here map is different as it is used on an array and is used to transform elements in array*/
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          }; /*checks if recipe has ingredients if not then it adds an empuy list of ingredients , ...recipe is a spread operator , ? is a turnuary expression */
        });
      }),
        tap( recipes => {
            this.recipeService.setRecipes(recipes);
          }               /*tap allows to execute some code here without altering the data that is funneled through that observable */

        )

      )/*.pipe map is used to transform the output of a oblservable */
      /*.subscribe(recipes =>{  /!*used typecript <> to inform angular that the responce in not a random array but our recipe model*!/
        this.recipeService.setRecipes(recipes);/!*called set recipes*!/
    })*/

  }

}
