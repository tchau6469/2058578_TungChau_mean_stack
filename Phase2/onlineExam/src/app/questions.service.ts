import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable, Subscriber } from 'rxjs';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public http:HttpClient) { }

  loadJsonData() :Observable<Questions[]> {

    return this.http.get<Questions[]>("../assets/questions.json");

    
    
  }
}
