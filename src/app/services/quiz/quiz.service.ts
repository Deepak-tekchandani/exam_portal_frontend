import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //load all Quizzes
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/getAll/`);
  }

  //ADD all Quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/create/`,quiz);
  }

  //Delete Quiz
  public deleteQuiz(qId:any){
    return this._http.delete(`${baseUrl}/quiz/delete/${qId}`);
  }
}
