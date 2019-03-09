import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';

@Component({
  selector: 'app-book-dis',
  templateUrl: './book-dis.component.html',
  styleUrls: ['./book-dis.component.scss']
})
export class BookDisComponent implements OnInit {
  @Input("category") category: String;
  p: any;
  searchText: any;
  books: any;
  currentRate = 8;

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.books = this.service.getBooks('/books');
  }
  // getBooks() {
  //   this.service.getBooks('/books').subscribe(res => {
  //     this.books = res;
  //   });
  // }
  deleteBook(id) {

  }
  public addProductToCart(book: Book): void {
    this.shoppingCartService.addItem(book, 1);
  }
  addFavourite(book: Book) {
    console.log(book);
    this.shoppingCartService.addFavouriteProduct(book);
  }
  public removeProductFromCart(book: Book): void {
    this.shoppingCartService.addItem(book, -1);
  }
  public productInCart(book: Book): boolean {
    console.log(book);

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
