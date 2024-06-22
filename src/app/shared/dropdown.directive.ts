import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

/*we create this directive to emable the dropdown effect of the manage option in the header of the nav and recipe-detail(you can do this by just toggling the class='btn open') open class in normal class='btn'*/

@Directive({
                                 /*this is used to make a directive (Directives are defined as classes that can add new behavior to the elements in the template or modify existing behavior)
                                , selector me [] default hai so that implimentation me sirf nam likhna ho*/
  selector:'[appDropdown]'
})

export class DropdownDirective {                    /*make sure to import to modules.ts if created manually*/
  @HostBinding('class.open') isOpen = false;        /* host binding bindes to the properties of the element where the directive is placed on  */

 /* @HostListener('click') toggleOpen() {             /!*this is a click listner ,can listen to more  old code  ;<     *!/
    this.isOpen = !this.isOpen ;
  }*/
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {          /*new code made by copy paste so that menue closes when you click anywhere hahahahahahhahahahah*/
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {

  }


}
