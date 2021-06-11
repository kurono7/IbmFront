import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../service/books.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss']
})
export class TableBooksComponent implements OnInit {
  elements: any;
  search!: FormGroup
  headElements = ['Title', 'Subject', 'Author', 'Publisher', 'Publishing Date', 'Publishing Phone'];
  categorys = [
    { value: 'all', label: 'All' },
    { value: 'title', label: 'Title' },
    { value: 'subject', label: 'Subject' },
    { value: 'author', label: 'Author' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'publisherPhone', label: 'Publisher Phone' }

  ];

  constructor(private bookService: BooksService, private formBuilder: FormBuilder) {
    this.getBooksTotal();
    this.buildForm()
  }

  ngOnInit() {
  }

  getBooksTotal() {
    this.bookService.getBooks().subscribe(resp => {
      this.elements = resp;
    })
  }



  private buildForm() {
    this.search = this.formBuilder.group({
      book: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.search.valid) {
      const value = this.search.value;
      if(value.category === 'all'){
        console.log("entra en all")
        this.getBooksTotal()
      }else{
        const obj = {
          type:value.category,
          name:value.book
        }
        this.bookService.getBooksCategory(obj).subscribe(resp => {
        
          this.elements = resp;
        })
      }
    } else {
      this.search.markAllAsTouched();
    }
  }

}
