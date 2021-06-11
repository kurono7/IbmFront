import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-form-books',
  templateUrl: './form-books.component.html',
  styleUrls: ['./form-books.component.scss']
})
export class FormBooksComponent implements OnInit {

  form!: FormGroup ;

  constructor( private formBuilder:FormBuilder, private bookService: BooksService ) {
    this.buildForm();
  }

  ngOnInit() {
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['',  [Validators.required]],
      publishingDate: ['', [Validators.required]],
      publisheremail: ['', [ Validators.email]],
      subject: ['',  [Validators.required]],
      author: ['',  [Validators.required]],
      Publisher: ['',  [Validators.required]],
      publisherPhone: ['',  [Validators.required]],
      
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.bookService.createBook(value).subscribe(resp => {
        console.log(resp)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
