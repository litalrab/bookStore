import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Book } from './../../Book';
import { ShoppingCart } from "./../../models/shopping-cart.model";
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ProductsDataService } from "../../services/products.service";
import { UserService } from "../../services/user.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public books;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  public user;

  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,private BookService: BookService,                     private userService: UserService,
    private UserService: UserService,

                     private shoppingCartService: ShoppingCartService) {
                      //  user=userService.c
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
   this.books = this.productsService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}