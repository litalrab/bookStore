import { Component, OnInit } from '@angular/core';
import { Book } from '../../Book';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ShoppingCartService } from './../../services/shopping-cart.service';
@Component({
	selector: 'app-favourite-products',
	templateUrl: './favourite-products.component.html',
	styleUrls: [ './favourite-products.component.scss' ]
})
export class FavouriteProductsComponent implements OnInit {
	favoruiteProducts: Book[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Favourite Products Found';
	messageDescription = 'Please, choose your favourite products';

	constructor(private shoppingCartService: ShoppingCartService) {}

	ngOnInit() {
		this.getFavouriteProduct();
	}

	removeFavourite(book: Book) {
		this.shoppingCartService.removeLocalFavourite(book);

		this.getFavouriteProduct();
	}

	getFavouriteProduct() {
		this.favoruiteProducts = this.shoppingCartService.getLocalFavouriteBooks();
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
public emptyWishList(): void {
    this.shoppingCartService.emptyWishList();
  }
}