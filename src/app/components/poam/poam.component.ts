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
  categoryTitle = 'שירה ומחזות';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}
