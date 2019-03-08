import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from './../../services/book.service';
import { Book } from '../../Book';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  p:number;
  searchText:any;
  public books: any;
  total: number=0;
  constructor( private route: ActivatedRoute, private router: Router,private service: BookService) {}

  ngOnInit() {
    this.books =this.getBooks('/books');
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.p = +params['p'] || 0;

        console.log('Query param page: ', this.p);
      });
  }

  getBooks(path) {
    return this.service.getBooksFromFire(path);
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
