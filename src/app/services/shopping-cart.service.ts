import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "./delivery-options.service";
import { BookService } from "./book.service";
import { Book } from '../Book';
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";

const CART_KEY = "cart";
const FAV_KEY = "fav";

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private books: Book[];
  private deliveryOptions: DeliveryOption[];
  itemCount = 0;
  navbarFavProdCount = 0;
  favouriteBooks: Array<Observer<FavouriteBook>> = new Array<Observer<FavouriteBook>>();


  public constructor(private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private storageService: StorageService,
    private BookService: BookService,
    private deliveryOptionsService: DeliveryOptionsDataService) {
    this.storage = this.storageService.get();
    // this.productService.all().subscribe((books) => this.books = books);
    this.BookService.getBooks('/books').subscribe((books) => this.books = books);
    //this.books=BookService.getBooks('/books');
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);
    this.itemCount = this.getCount();
   this.calculateLocalFavBookCounts();
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
    // Toaster Config
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }
  public getCount(): number {
    return Number(this.storage.getItem("itemCount"));
  }

  public addItem(book: Book, quantity: number): void {

    const cart = this.retrieve();
    let item = cart.items.find((p) => p.bookId === book.id);
    if (item === undefined) {
      console.log(book.id);

      item = new CartItem();
      item.bookId = book.id;
      console.log(item.bookId);
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    // Toaster Add
    if (quantity > 0) {
      const toastOption: ToastOptions = {
        title: "Adding Product to Cart",
        msg: "Product Adding to the cart",
        showClose: true,
        timeout: 1000,

        theme: "material"
      };
      this.toastyService.wait(toastOption);


    }

    this.save(cart);
    this.dispatch(cart);
    this.itemCount = this.itemCount + quantity;
    console.log(this.itemCount);

    //this.itemCount=this.getCount();
    this.saveItemCount(this.itemCount);
    console.log(this.itemCount);


  }
  private saveItemCount(count: number): void {
    this.storage.setItem("itemCount", JSON.stringify(count));
  }
  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
    this.itemCount = 0;
    this.saveItemCount(this.itemCount);
  }
 
  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: ShoppingCart): void {
    console.log(cart.items);

    cart.itemsTotal = cart.items
      .map((item) => item.quantity * this.books.find((p) => p.id === item.bookId).price)
      .reduce((previous, current) => previous + current, 0);
    cart.deliveryTotal = cart.deliveryOptionId ?
      this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
      0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

  public retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: ShoppingCart): void {
    // this.storage.setItem(CART_KEY, JSON.stringif
    setTimeout(() => {
      this.storage.setItem(CART_KEY, JSON.stringify(cart));
    }, 500);
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }

	/*
   ----------  Favourite Product Function  ----------
  */


  // Adding New product to favourite if logged else to localStorage
  public addFavouriteProduct(data: Book): void {
    let a: Book[];
		a = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    a.push(data);
    // this.storage.setItem('avf_item', JSON.stringify(a));
    // this.calculateLocalFavBookCounts();
    // this.toastService.wait('Adding Product', 'Adding Product as Favourite');
    setTimeout(() => {
    	localStorage.setItem(FAV_KEY, JSON.stringify(a));
    	this.calculateLocalFavBookCounts();
    }, 1500);

  }

  // Fetching unsigned users favourite proucts
  public getLocalFavouriteBooks(): Book[] {
    const books: Book[] =  JSON.parse(localStorage.getItem(FAV_KEY))|| [];

    return books;
  }



  // Removing Favourite Book from localStorage
  removeLocalFavourite(book: Book) {
    const books: Book[] =  JSON.parse(localStorage.getItem(FAV_KEY));

    for (let i = 0; i < books.length; i++) {
      if (books[i].id === book.id) {
        books.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
		localStorage.setItem(FAV_KEY, JSON.stringify(books));

    this.calculateLocalFavBookCounts();
  }

  // Returning Local Products Count
  calculateLocalFavBookCounts() { 
    const books: Book[] =  JSON.parse(localStorage.getItem(FAV_KEY))|| [];
    this.navbarFavProdCount = books.length;
   
    // this.navbarFavProdCount = this.getLocalFavouriteBooks().length;
  }
  public emptyWishList(): void {
    let a: Book[];
    a =  [];

    localStorage.setItem(FAV_KEY, JSON.stringify(a));
   this.calculateLocalFavBookCounts();
  }
}
export class FavouriteBook {
  book: Book;
  bookId: string;
  userId: string;
}