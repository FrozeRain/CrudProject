import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(private http: HttpClient) {}

  furniture = [];
  newFurniture: object = {};
  warn: string;
  name: string = "";
  material: string = "";
  pos: number;
  isEdit: boolean = false;


  addNewFurniture (nam, mat){
    if (nam.toString() != "" && mat.toString() != "") {
      this.warn = "";
      this.newFurniture = {
        "name": nam,
        "material": mat
      };
      this.furniture.push(this.newFurniture);
      //this.http.post('./assets/furniture.json', this.newFurniture, httpOptions).toPromise()
      //  .then(data => {
      //    console.log(data)
      //  })
    } else {
      this.warn = "FILL OUT ALL FORMS!"
    }
  };

  deleteFurn (furn){
    for (let i = 0; i < this.furniture.length; i++){
      if (this.furniture[i] == furn){
        this.furniture.splice(i, 1);
        break;
      }
    }
  }

  editFurn (furn){
    this.isEdit = !this.isEdit;
    for (let i = 0; i < this.furniture.length; i++){
      if (this.furniture[i] == furn){
        this.name = this.furniture[i].name;
        this.material = this.furniture[i].material;
        this.pos = i;
      }
    }
    console.log(this.name + this.material);
  }

  updateForm (){
    this.isEdit = !this.isEdit;
    this.furniture[this.pos].name = this.name;
    this.furniture[this.pos].material = this.material;
    console.log(this.name);
  }

  ngOnInit() {
    this.http.get('./assets/furniture.json').subscribe(
      data => {
        let res = data[0];
        this.furniture = res['furniture'];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
