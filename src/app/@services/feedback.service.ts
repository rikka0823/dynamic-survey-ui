import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class FeedBackService {
  quizId!: number;
  constructor(private http: HttpClient) {}

  getFeedBackData(quizId: number) {
    return this.http.get<any>('http://localhost:8080/quiz/feedback?quizId=' + quizId);
  }

  feedBackData!: any;
}
