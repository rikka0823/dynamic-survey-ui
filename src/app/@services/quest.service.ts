import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class QuestService {
  questSurveyData!: any;
  questTopicData: QuesData[] = [];
  returnData: any[] = [];
  questState!: any;
  quizData!: QuizData[];
  quizId!: number;
  isEdit!: boolean;

  constructor(private http: HttpClient) {}

  // 獲取問卷資料
  getQuizData() {
    return this.http.get<any>('/api/quiz/getQuizData');
  }

  // 依照問卷 id 獲取問卷資料
  getQuizDataById(id: number) {
    return this.http.get<any>('/api/quiz/getQuizDataById?quizId=' + id);
  }

  // 依照問卷 id 獲取問卷題目資料
  getQuesDataById(id: number) {
    return this.http.get<any>('/api/quiz/getQuesData?quizId=' + id);
  }
}

export interface QuizData {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  published: boolean;
}

export interface QuesData {
  quesId: number;
  required: boolean;
  quesName: string;
  type: string;
  options: any[];
}
