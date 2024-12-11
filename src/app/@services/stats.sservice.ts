import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class StatsService {
  quizId!: number;

  constructor(private http: HttpClient) {}

  getStatsDataById(id: number) {
    return this.http.get<any>('http://localhost:8080/quiz/statistics?quizId=' + id);
  }
}
