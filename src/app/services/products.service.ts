import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "../models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";
import { Book } from '../Book';

let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  private Books: Observable<Book[]>;

  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Book[]> {
    const uri = 'http://localhost:4000/Books';

    return this.cache<Book[]>(() => this.Books,
                                 (val: Observable<Book[]>) => this.Books = val,
                                 () => this
                                 .http
                                 .get(uri)
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }
}
