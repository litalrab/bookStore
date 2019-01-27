import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "./../../models/cart-item.model";
import { DeliveryOption } from "./../../models/delivery-option.model";
import { ShoppingCart } from "./../../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../../services/delivery-options.service";
import {  BookService } from "../../services/book.service";
import {  AuthService } from "../../services/auth.service";
import { Order } from './../../models/order';
import { UserService } from "../../services/user.service";

import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Book } from "../../Book";
import { UserDetail } from "../../models/user.module"
import 'bootstrap/dist/js/bootstrap.bundle';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material';
import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from 'firebase';
import { ToastyService} from "ng2-toasty";
import { AngularFireAuth } from "angularfire2/auth";

interface ICartItemWithProduct extends CartItem {
  book: Book;
  totalCost: number;
}

@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  public selectedPaymentMethod : string;
  private books: Book[];
  private cartSubscription: Subscription;
  PaymentMethod :any =['העברה בנקאית','תשלום במזומן'];
  //choose your payment mathod
  radioChngeHanler (event: any){
    this.selectedPaymentMethod =event.target.value;
  }
    //user detail
   public  checkoutForm: any = {};

 
  matcher = "";
  phonePrefix = "";
  public constructor(private BookService: BookService,  private firebaseAuth: AngularFireAuth,
                     private toastyService: ToastyService,
                     private userService: UserService,
                     private router: Router,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService,
                     private authService: AuthService

                     ) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
     // this.BookService.getBooks('/books').subscribe((books) => this.books = books);
      this.BookService.getBooks('/books').subscribe((products) => {
        this.books = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const book = this.books.find((p) => p.id === item.bookId);
                              return {
                                ...item,
                                book,
                                totalCost: book.price * item.quantity };
                           });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.checkoutForm));
    console.log(this.checkoutForm.firstName, this.checkoutForm.value);

    console.log(this.checkoutForm.valid, this.checkoutForm)
    if (this.checkoutForm.valid) {
    //  this.openDialog();
    }
   this.openDialog();
  }
  /*
  onSubmit(checkoutForm: NgForm) {
    console.log(this.checkoutForm.valid, this.checkoutForm)
    if (this.checkoutForm.valid) {
    //  this.openDialog();
    }
    
    this.openDialog();
  }*/
  openDialog(): void {
   //   if (result && result === "confirm") {
     //   this.disbaleSubmit();
        let firstName = <string><any>this.checkoutForm.firstName;
        let lastName = <string><any>this.checkoutForm.lastName;
        let address = <string><any>this.checkoutForm.address;
        let key = <string><any>this.checkoutForm.key;
        let postalCode = <number><any>this.checkoutForm.postalCode;
        let city = <string><any>this.checkoutForm.city;
        let phoneNumber = <number><any>this.checkoutForm.phoneNumber;
        let email = <string><any>this.checkoutForm.email;
   //     UserDetail
       console.log(firstName,this.checkoutForm.firstName,<string><any>this.checkoutForm.firstName)

        let UserDetailObj = new UserDetail(firstName, lastName, email, address, city,  phoneNumber,  postalCode);
        let userDetail = new UserDetail(firstName, lastName, email, address, city,  phoneNumber,  postalCode);
        console.log(UserDetailObj)
        console.log(userDetail)

     //   let addressObj = new Address(firstName, lastName, address, address2 ? address2 : "", postalCode, city, country, phoneNumber, email);
        let id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        let date = new Date(Date.now()).toLocaleString('en-SE', { timeZone: 'UTC' })
        let userId = this.authService.currentUserId;
  //      this.userService.getUsers.
        let order = new Order(userId, this.shoppingCartService.retrieve(), this.shoppingCartService.retrieve().grossTotal,  "kr", userDetail, date, this.selectedPaymentMethod);
     //   let order2 = new Order(userId, this.shoppingCartService.retrieve(), this.shoppingCartService.retrieve().grossTotal,  "kr", userDetail, date, this.selectedPaymentMethod);

        console.log(order.userDetail);
     //   ('/clients/{uid}')
     let useruid= this.firebaseAuth.auth.currentUser;     //FirebaseUser user=this.FirebaseAuth.getInstance().getCurrentUser();
    // String useruid=user.getUid();
 //    console.log(this.authService.getLoggedInUser().$key );
     console.log(this.authService.getLoggedInUser());

    firebase.database().ref().child('/clients/' + userId)
        .update({ title: "New title", body: "This is the new body" });     
           let orderRef = firebase.database().ref(`orders`);
        orderRef.push(order).then(() => {
          this.shoppingCartService.empty();
          this.router.navigate(['confirmed'], {
            queryParams: {
              orderKey: orderRef.key
            }
          });
     //     this.enableSubmit();
        });
     // }
    
  }
  /*
  private disbaleSubmit() {
    this.submitButton.disabled = true;
    this.submitButton.html = "Processing...";
  }*/

}
