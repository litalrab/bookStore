import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Book } from '../../Book';
@Component({
  selector: 'app-kids-youth',
  templateUrl: './kids-youth.component.html',
  styleUrls: ['./kids-youth.component.scss']
})
export class KidsYouthComponent implements OnInit {
  categoryTitle = 'ילדים ונוער';

  constructor(private http: HttpClient, private service: BookService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  
}
