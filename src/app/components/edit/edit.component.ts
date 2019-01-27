import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm,FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Book } from '../../Book';

import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };

  book: any;
  angForm: FormGroup;
  title = 'Edit book';
  constructor(private route: ActivatedRoute, private router: Router, private BookService: BookService, private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      author: ['', Validators.required ],
      category: ['', Validators.required ],
      price: ['', Validators.required ]
       });
  }
  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  updateBook(bookform: NgForm) {

    //delete undefined fields to be able to upload firebase;
    
    for(var key in bookform.value)
    {
        if(bookform.value[key] === undefined)
        {
          delete bookform.value[key] ;
        }
    }
    console.log(bookform.value);   

    if( this.selectedFiles)
    {
     const file = this.selectedFiles.item(0);
     this.selectedFiles = undefined;
     bookform.value["file"] = file;
     console.log(this.book.file );
  
     console.log(bookform.value.file );
    }
    this.route.params.subscribe(params => {
      console.log(params['key']);    

    this.BookService.updateBook(bookform.value, params['id']);

    this.router.navigate(['index']);
  });
  this.book = new Book(undefined);

}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);    
      this.book = this.BookService.editBook(params['id'])
    });
  }
}
