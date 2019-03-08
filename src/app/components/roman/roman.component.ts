import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';
@Component({
  selector: 'app-roman',
  templateUrl: './roman.component.html',
  styleUrls: ['./roman.component.scss']
})
export class RomanComponent implements OnInit {
  categoryTitle = 'רומן רומנטי/אירוטי';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}