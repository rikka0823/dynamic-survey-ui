import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class FeedBackService {
  quizId!: number;
  feedBackData!: any;

  constructor(private http: HttpClient) {}

  // 依問卷 id 獲取回饋資料
  getFeedBackData(quizId: number) {
    return this.http.get<any>('http://localhost:8080/quiz/feedback?quizId=' + quizId);
  }
}
