import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent{

  constructor(private dataStorageService: DataStorageService) {
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();    /*calls to store data by put*/

  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();     /*calls to fetch data , we subscribe here due to recipes resolver*/
  }

}
