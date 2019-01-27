import { Component, OnInit } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Book } from '../../Book';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  p:any;
  searchText:any;
  public books: any;
  total: number=0;
  constructor( private service: BookService) {}

  ngOnInit() {
    this.books =this.getBooks('/books');
  }

  getBooks(path) {
    return this.service.getBooks(path);
  }

  deleteBook(book: any) {
   // console.log(book.key);
    console.log(book);
    this.service.deleteBook(book);
  }
  totalAmount(price:number): void {
    this.total=this.total+price;
  
    
  }
}
