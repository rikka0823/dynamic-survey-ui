import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class QuestResService {
  questResData!: any;
  quizAllData!: any;
  quizId!: number;
  fillinData!: FillinData | undefined;
}

export interface FillinData {
  quizId: number;
  userName: string;
  phone: string;
  email: string;
  age: number;
  answer: any;
  fillinDate: string;
}
