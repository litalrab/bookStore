import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from '../Book'

@Injectable()
export class BookService {

  result: any;
  private basePath = '/books';
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;


  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list(this.basePath);
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  pushFileToStorage(Book: Book, progress: { percentage: number }) {

    const storageRef = firebase.storage().ref();
    //if you didnt entered a picture
    if (Book.file) {
      const uploadTask = storageRef.child(`${this.basePath}/${Book.file.name}`).put(Book.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);

        },
        () => {

          // success

          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            Book.url = downloadURL;
            console.log('File available at', downloadURL);
            console.log(Book);
            this.createProduct(Book);


          });
          // this.createProduct(Book);

          //Book.url=
          //   Book.name = Book.file.name;

        }
      );

    }
    else {
      this.createProduct(Book);

    }
  }
  addBook(id, name, author, category, price) {
    const data = {
      id: id,
      name: name,
      author: author,
      category: category,
      price: price

    };
    // const obj = this.db.database.ref(this.basePath);
    // var key =obj.push(data);
    //  this.keys.add(key);
    var key = this.itemsRef.push(data).key;
    console.log('Success');
    console.log(key);
  }
  createProduct(data: Book) {
    console.log(data);

    var key = this.itemsRef.push(data).key;
    console.log('Success');
    console.log(key);
  }

  getBooks(path): Observable<any[]> {
    return this.items;//
    //   return this.db.list(path).valueChanges();
  }

  editBook(id) {
    const uri = 'http://localhost:4000/Books/edit/' + id;
    return this

  }
  updateBook(Book, id) {
    const uri = 'http://localhost:4000/Books/update/' + id;
    console.log("in update");
    console.log(id);
    var downloadUrl;
    const storageRef = firebase.storage().ref();
    //if you didnt entered a picture
    if (Book.file) {
      const uploadTask = storageRef.child(`${this.basePath}/${Book.file.name}`).put(Book.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);

        },
        () => {

          // success

          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            Book["url"] = downloadURL;
            console.log('File available at', downloadURL);

            downloadUrl = downloadURL;
            console.log(Book);
            //  this.createProduct(Book);
            console.log(downloadUrl)
            //return this.itemsRef.update(id,   { 'url': downloadURL });
             return this.itemsRef.update(id,   Book);


          });
          // this.createProduct(Book);

          //Book.url=
          //   Book.name = Book.file.name;

        }
      );

    }
    console.log(Book);
    console.log(downloadUrl)
    // return snapshot.ref.update(updates);
    return this.itemsRef.update(id, Book);

    // return this.itemsRef.update(id,   { 'url': downloadUrl });



  }
  updateBook1(key, name, author, category, price, id) {
    const uri = 'http://localhost:4000/Books/update/' + id;
    console.log("in update");
    console.log(id);
    const obj = {
      name: name,
      author: author,
      category: category,
      price: price
    };

    return this.itemsRef.update(id, {
      name: name,
      author: author,
      category: category,
      price: price
    });

  }

  deleteBook(key) {
    console.log(key);

    this.itemsRef.remove(key);


    // var newPostKey = this.db.database.ref(this.basePath).push().key;
    // console.log(newPostKey);
    // this.db.list(this.basePath).remove(key);

    //   this.db.object('books/' + key).remove();  
    ////     this.db.list(this.basePath).remove(this.keys.get(key.name));
    //this.keys.delete(this.keys.get(key.name));

  }
}
