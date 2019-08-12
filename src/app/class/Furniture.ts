export class Furniture {
  id: number;
  name: string;
  material: string;
  description: string;

  constructor(id: number, name: string, mat: string, desc: string){
    this.id = id;
    this.name = name;
    this.material = mat;
    this.description = desc;
  }
}
