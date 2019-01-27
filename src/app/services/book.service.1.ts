import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  result: any;
  constructor(private http: HttpClient) {}

  addBook(id,name,author,category, price,status) {
    const uri = 'http://localhost:4000/Books/add';
    const obj = {
      id:id,
      name: name,
      author:author,
      category:category,
      price: price,
      status:status
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res =>
          console.log('Done'));
  }

  getBooks() {
    const uri = 'http://localhost:4000/Books';
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  editBook(id) {
    const uri = 'http://localhost:4000/Books/edit/' + id;
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }
;
  updateBook(name,author,category, price,status, id) {
    const uri = 'http://localhost:4000/Books/update/' + id;

    const obj = {
      name: name,
      author:author,
      category:category,
      price: price,
      status:status
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteBook(id) {
    const uri = 'http://localhost:4000/Books/delete/' + id;

        return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }
}
