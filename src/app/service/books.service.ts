import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _URL = "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  createBook(book: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post(`${this._URL}create-book/`, book, { headers: header });
  }

  getBooks() {
    return this.http.get(`${this._URL}books`)
  }
  getBooksCategory(value: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post(`${this._URL}bookSubject/`, value, { headers: header });
  }
}
