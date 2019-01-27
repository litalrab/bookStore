import { Ingredient } from "./ingredient.model";

export class Product {
  id: string;
  name: string;
  author:string;
  category:string;
  price: number;
  description:string;
  imageUrl: string;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.author = src.author;
    this.category = src.category;
    this.price = src.price;
    this.description = src.description;
    this.imageUrl = src.imageUrl;
   
  }
}
