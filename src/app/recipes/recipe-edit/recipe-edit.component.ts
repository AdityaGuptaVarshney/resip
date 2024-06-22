import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.modle";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id:number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService , private router: Router) {       /*import router for getting acess to routing*/
  }
  ngOnInit() {
    this.route.params.subscribe(                             /*if you create your own observables the you have to cleane your mess ie unsub to your fav youtuber ahhahahahah just kidding to your obserbable */
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;               /*whenerver rout params change we call initform as that indecates we reload page*/
        this.initform();

      }
    )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);   /*you can also just directly pass the object */
    }
    this.onCancle();

  }

  onCancle(){
    this.router.navigate(['../'], {relativeTo: this.route}); /*this.route gets the current route form active route and ../ moves  it up */

  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(        /*<FormArray> is used to cast its type for typescript and angular , now it is treated as a form array hence we can now push formgroup (there are 2 controls )*/
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)   /*this is pattern validator to ensure positive values*/
        ])

      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);       /*makes the X button work calls the form list and removes , As of Angular 8+, there's a new way of clearing all items in a FormArray.

(<FormArray>this.recipeForm.get('ingredients')).clear();
The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

It's like manually creating a loop and calling removeAt() for every item.*/

  }

  private initform(){            /*we create our reactive form here*/
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);      /*used forms array for something ... :/ */

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount ,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)   /*this is pattern validator to ensure positive values*/
              ])

            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),      /*adding validation to the controls*/
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }



}
