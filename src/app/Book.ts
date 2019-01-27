export class Book {
 id: string;

  name: string;
  author:string;
  category:string;
  price: number;
  status:string;
  url: string;
  file: File;
 
  constructor(file: File) {
    this.file = file;
  }
}