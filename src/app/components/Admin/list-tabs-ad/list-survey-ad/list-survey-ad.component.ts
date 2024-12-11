import { Component } from '@angular/core';
import { DateService } from '../../../../@services/date.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { QuestService, QuizData } from '../../../../@services/quest.service';

@Component({
  selector: 'app-list-survey-ad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-survey-ad.component.html',
  styleUrl: './list-survey-ad.component.scss'
})
export class ListSurveyAdComponent {
  surveyName!: string;
  surveyTopic!: string;
  startDate!: string; // 儲存開始時間
  endDate!: string; // 儲存結束時間
  minDate!: string; // 起始日期可選擇的初始值
  maxDate!: string; // 起始日期可選擇的最大值
  endMaxDate!: string; // 結束日期可選擇的最大值

  constructor(
    private dateService: DateService,
    private router: Router,
    private questService: QuestService,
  ) {}

  async ngOnInit(): Promise<void> {
    const quizId = this.questService.quizId;


    if (this.questService.isEdit) {
      let quizDataRes!: any;

      let quizData!: QuizData;

      quizDataRes = await firstValueFrom(this.questService.getQuizDataById(quizId));
      if (quizDataRes && quizDataRes.quiz) {
        quizData = {
          id: quizDataRes.quiz.id,
          name: quizDataRes.quiz.name,
          startDate: quizDataRes.quiz.startDate,
          endDate: quizDataRes.quiz.endDate,
          description: quizDataRes.quiz.description,
          published: quizDataRes.quiz.published
        }
      }
      this.surveyName = quizData.name;
      this.surveyTopic = quizData.description;
      this.startDate = quizData.startDate ;
      this.endDate = quizData.endDate;
    }

    // 若有資料，表示回上一頁，須將使用者的資料重新放入
    if (this.questService.questSurveyData) {
      this.surveyName = this.questService.questSurveyData.name;
      this.surveyTopic = this.questService.questSurveyData.description;
      this.startDate = this.questService.questSurveyData.startDate;
      this.endDate = this.questService.questSurveyData.endDate;
    }

    // 可選擇初始值為當天
    this.minDate = this.dateService.changeDateFormat(new Date());
    // 最大值為加30天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 30));
  }

   // 限制結束日期可選擇的最大值為開始時間+30日
   changeDate() {
    this.endMaxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(this.startDate), 30));
  }

  navigateToList() {
    this.questService.questSurveyData = "";
    this.questService.questTopicData = [];
    this.questService.returnData = [];
    this.questService.quizId = 0;
    this.questService.isEdit = false;
    this.router.navigate(['/list-search']);
  }

  navigateToTopic() {
    if (!this.questService.questSurveyData) {
      this.questService.questSurveyData = {
        name: this.surveyName,
        description: this.surveyTopic,
        startDate: this.startDate,
        endDate: this.endDate
      }
    }

    if (this.questService.questSurveyData) {
      this.questService.questSurveyData = {
        name: this.surveyName,
        description: this.surveyTopic,
        startDate: this.startDate,
        endDate: this.endDate
      }
    }



    if (!this.surveyName || !this.surveyTopic || !this.startDate || !this.endDate) {
      alert("請填寫完整問卷資訊");
    } else {
      this.router.navigate(['/list-tabs-ad/list-topic-ad'])
    }
  }
}
