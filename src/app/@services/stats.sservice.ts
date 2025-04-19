import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class StatsService {
  quizId!: number;

  constructor(private http: HttpClient) {}

  // 依照問卷 id 獲得統計資料
  getStatsDataById(id: number) {
    return this.http.get<any>('/api/quiz/statistics?quizId=' + id);
  }
}
