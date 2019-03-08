import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import { ShoppingCartService } from "../../services/shopping-cart.service";

import { BookService } from './../../services/book.service';
import { Book } from '../../Book';
@Component({
  selector: 'app-spare-time',
  templateUrl: './spare-time.component.html',
  styleUrls: ['./spare-time.component.scss']
})
export class SpareTimeComponent implements OnInit {
  categoryTitle = 'פנאי ותחביבים';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}

