import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Furniture} from "../class/Furniture";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  private furniture: Furniture[];
  private nextId: number;
  warn: string;
  name: string = "";
  material: string = "";
  describe: string = "";
  index: number;
  isEdit: boolean = false;


  constructor(private http: HttpClient) {
    let furniture = this.getFurniture();

    if (furniture.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = furniture[furniture.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  setStorage(furniture: Furniture[]): void {
    localStorage.setItem('furniture', JSON.stringify({furniture: furniture}));
  }

  addNewFurniture(nam: string, mat: string, desc: string) {
    let furn = new Furniture(this.nextId, nam, mat, desc);
    if (nam != "" && mat != "") {
      this.warn = "";
      let furniture = this.getFurniture();
      furniture.push(furn);
      this.setStorage(furniture);
      this.nextId++;
    } else {
      this.warn = "FILL OUT ALL FORMS!"
    }
  };

  deleteFurn(id: number): void {
    let furniture = this.getFurniture();
    furniture = furniture.filter((furn) => furn.id != id);
    this.setStorage(furniture);
  }

  editFurn(id: number) {
    this.isEdit = !this.isEdit;
    let furniture = this.getFurniture();
    for (let i = 0; i < furniture.length; i++) {
      if (furniture[i].id == id) {
        this.name = furniture[i].name;
        this.material = furniture[i].material;
        this.describe = furniture[i].description;
        this.index = i;
      }
    }
    console.log(this.name + this.material);
  }

  updateForm() {
    this.isEdit = !this.isEdit;
    let furniture = this.getFurniture();
    furniture[this.index].name = this.name;
    furniture[this.index].material = this.material;
    furniture[this.index].description = this.describe;
    this.setStorage(furniture);
    console.log(this.name);
  }

  public getFurniture(): Furniture[] {
    let localStorageItem = JSON.parse(localStorage.getItem('furniture'));
    return localStorageItem == null ? [] : localStorageItem.furniture;
  }

  public deafultFurn() {
    this.http.get('../../assets/furniture.json').subscribe(data => {
      let result: Furniture[] = JSON.parse(JSON.stringify(data)).furniture;
      this.setStorage(result.concat(this.getFurniture()));
    });
  }

  ngOnInit() {
    //this.deafultFurn();
    this.getFurniture();
  }

}
