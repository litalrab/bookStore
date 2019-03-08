import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  categoryTitle = 'הורות ומשפחה';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}
