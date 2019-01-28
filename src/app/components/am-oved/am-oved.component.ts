import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';

@Component({
  selector: 'app-am-oved',
  templateUrl: './am-oved.component.html',
  styleUrls: ['./am-oved.component.scss']
})
export class AmOvedComponent implements OnInit {
  categoryTitle = 'עם עובד';


  constructor() {}

  ngOnInit() {
 
  }

 
}
