import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';

@Component({
  selector: 'app-religigion',
  templateUrl: './religigion.component.html',
  styleUrls: ['./religigion.component.scss']
})
export class ReligigionComponent implements OnInit {
  categoryTitle = 'דת ורוחניות';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}
