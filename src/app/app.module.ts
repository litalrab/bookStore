import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { appRoutes } from './routerConfig';
import { BookService } from './services/book.service';
import { UserService } from './services/user.service';


import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { FilterPipe} from './filter.pipe';
import { HomeComponent } from './components/home/home.component';
import { OriginalComponent } from './components/original/original.component';
import { MatGridListModule, MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { RomanComponent } from './components/roman/roman.component';
import { ActionComponent } from './components/action/action.component';
import { HistoryComponent } from './components/history/history.component';
import { FantasyComponent } from './components/fantasy/fantasy.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { BiographyComponent } from './components/biography/biography.component';
import { PoamComponent } from './components/poam/poam.component';
import { AmOvedComponent } from './components/am-oved/am-oved.component';
import { StudyComponent } from './components/study/study.component';
import { KidsYouthComponent } from './components/kids-youth/kids-youth.component';
import { SpareTimeComponent } from './components/spare-time/spare-time.component';
import { CookingComponent } from './components/cooking/cooking.component';
import { DietComponent } from './components/diet/diet.component';
import { FamilyComponent } from './components/family/family.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsDataService } from "./services/products.service";
import { DeliveryOptionsDataService } from "./services/delivery-options.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
import {  StorageService } from "./services/storage.service";
import { LocalStorageServie } from "./services/storage.service";
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { AuthService } from "./services/auth.service";
import { ToastyModule } from "ng2-toasty";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AdminGaurd } from "./services/admin-gaurd.service";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuth } from "angularfire2/auth";
import { TranslateComponent } from './components/translate/translate.component';
import { EnglishComponent } from './components/english/english.component';
import { FavouriteProductsComponent } from './components/favourite-products/favourite-products.component';
import { NoProductsFoundComponent } from './components/no-products-found/no-products-found.component';
import { BookDisComponent } from './components/book-dis/book-dis.component';
import { ReligigionComponent } from './components/religigion/religigion.component';
import { HumorComponent } from './components/humor/humor.component';
import { BodyComponent } from './components/body/body.component';


@NgModule({


  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    FilterPipe,

    HomeComponent,
    OriginalComponent,
    RomanComponent,
    ActionComponent,
    HistoryComponent,
    FantasyComponent,
    CinemaComponent,
    BiographyComponent,
    PoamComponent,
    AmOvedComponent,
    StudyComponent,
    KidsYouthComponent,
    SpareTimeComponent,
    CookingComponent,
    DietComponent,
    FamilyComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    LoginComponent,
    TranslateComponent,
    EnglishComponent,
    FavouriteProductsComponent,
    NoProductsFoundComponent,
    BookDisComponent,
    ReligigionComponent,
    HumorComponent,
    BodyComponent
  ],
  imports: [
    CommonModule , HttpModule, AngularFireModule.initializeApp(environment.firebase),    ToastyModule.forRoot(),
           MDBBootstrapModule.forRoot(),


    AngularFireDatabaseModule,FormsModule,FileUploadModule,    NgxPaginationModule,
    ReactiveFormsModule, BrowserModule,MatCardModule,MatGridListModule, MatToolbarModule , RouterModule.forRoot(appRoutes), HttpClientModule, ReactiveFormsModule,    FormsModule

  ],
  exports: [
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    ToastyModule,
    RouterModule,  
      AngularFireModule,
      MDBBootstrapModule,


    NgxPaginationModule
  ],
  providers: [BookService,UserService,   DeliveryOptionsDataService,AuthService,AngularFireAuth,AdminGaurd,
    ProductsDataService,ShoppingCartService,LocalStorageServie, { provide: StorageService, useClass: LocalStorageServie }],
  bootstrap: [AppComponent]
})
export class AppModule { }
