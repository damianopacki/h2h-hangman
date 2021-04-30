import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private url = 'http://localhost:3000/answers';

  constructor(private httpClient: HttpClient) { }

  getAnswers(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url);
  }
}
