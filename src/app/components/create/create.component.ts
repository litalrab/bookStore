import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { NgForm, EmailValidator } from "@angular/forms";
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.module";
import { Book } from '../../Book';

declare var $: any;
declare var require: any;
const shortId = require("shortid");
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  book: Book = new Book(undefined);
  selectedFiles: FileList;
  title = 'הוסף ספר';

  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private BookService: BookService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
     private router: Router
  ) {
    this.toastyConfig.theme = "material";
  }

  ngOnInit() {
  }
  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  addBook(bookform: NgForm) {
    
  console.log(bookform.value);   

    const toastOptions: ToastOptions = {
      title: "book Creation",
      msg:
        "book " + bookform.value["name"] + "is added successfully",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };
    bookform.value["id"] = "BOOK_" + shortId.generate();
  //  productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
   // if (bookform.value["bookimg"] === undefined) {
    //  bookform.value["bookimg"] =
      //  "http://via.placeholder.com/640x360/007bff/ffffff";
   // }

   // productForm.value["favourite"] = false;
   if( this.selectedFiles)
   {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    bookform.value["file"] = file;
    console.log(this.book.file );
 
    console.log(bookform.value.file );
   }
  
   console.log(bookform.value );

   this.BookService.pushFileToStorage(bookform.value, this.progress);

    //this.BookService.createProduct(bookform.value);

    this.book = new Book(undefined);
    //setTimeout((router: Router) => {
   //   $("#exampleModalLong").modal("hide");
   // }, 1500);
  //  $("#exampleModalLong").modal("hide");

    this.toastyService.success(toastOptions); 
     // this.router.navigate(['index']);
  }
  
}

