import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  p:any;
  searchText:any;
  books: any;
  currentRate = 8;
  constructor(private http: HttpClient, private service: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.service.getBooks('/books').subscribe(res => {
      this.books = res;
    });
  }
  deleteBook(id) {

  }

}
