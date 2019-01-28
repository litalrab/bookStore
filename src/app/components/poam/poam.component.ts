import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import { ShoppingCartService } from "../../services/shopping-cart.service";

import { Book } from '../../Book';
@Component({
  selector: 'app-poam',
  templateUrl: './poam.component.html',
  styleUrls: ['./poam.component.scss']
})
export class PoamComponent implements OnInit {
  p:any;
  searchText:any;
  books: any;
  currentRate = 8;

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.service.getBooks('/books').subscribe(res => {
      this.books = res;
    });
  }
  deleteBook(id) {

  }
  public addProductToCart(book: Book): void {
    this.shoppingCartService.addItem(book, 1);
  }

  public removeProductFromCart(book: Book): void {
    this.shoppingCartService.addItem(book, -1);
  }
  public productInCart(book: Book): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.bookId === book.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }
}