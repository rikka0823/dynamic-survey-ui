import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../../@services/http-client.service';
import { QuestService } from '../../../../@services/quest.service';

@Component({
  selector: 'app-list-preview-ad',
  standalone: true,
  imports: [],
  templateUrl: './list-preview-ad.component.html',
  styleUrl: './list-preview-ad.component.scss'
})
export class ListPreviewAdComponent {
  questSurveyData!: any;
  questTopicData!: any;
  returnData!: any;

  constructor(
    private router: Router,
    private questService: QuestService,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.questSurveyData = this.questService.questSurveyData;
    this.questTopicData = this.questService.questTopicData;
    this.returnData = this.questService.returnData;

  }

  navigateToTopic() {
    this.router.navigate(['/list-tabs-ad/list-topic-ad']);
  }

  // 僅儲存
  notPublished() {
    if (!this.questSurveyData || !this.questService.questTopicData) {
      return alert('請確認問卷填寫資訊');
    }

    this.returnData = {
      id: this.questService.quizId,
      name: this.questSurveyData.name,
      description: this.questSurveyData.description,
      startDate: this.questSurveyData.startDate,
      endDate: this.questSurveyData.endDate,
      published: false,
      quesList: this.questService.returnData
    };
    console.log(this.returnData);
    console.log(this.questService.isEdit);

    if (!this.questService.isEdit) {
      this.http.postApi('http://localhost:8080/quiz/create', this.returnData).subscribe(
        (res: any) => {
          console.log(res);
          return alert('已成功儲存');
        }
      );
    } else {
      this.http.postApi('http://localhost:8080/quiz/update', this.returnData).subscribe(
        (res: any) => {
          console.log(res);
          return alert('已成功修改並儲存');
        }
      );
    }

     // 清空資料
     this.questService.questSurveyData = "";
     this.questService.questTopicData = [];
     this.questService.returnData = [];
     this.questService.quizId = 0;
     this.questService.isEdit = true;

    this.router.navigate(['/list-search']);
  }

  // 儲存並發布
  published() {
    this.returnData = {
      id: this.questService.quizId,
      name: this.questSurveyData.name,
      description: this.questSurveyData.description,
      startDate: this.questSurveyData.startDate,
      endDate: this.questSurveyData.endDate,
      published: true,
      quesList: this.questService.returnData
    };

    if (!this.questService.isEdit)  {
      this.http.postApi('http://localhost:8080/quiz/create', this.returnData).subscribe(
        (res: any) => {
          console.log(res);
         return alert('已成功儲存並發布');
        }
      );
    } else {
      this.http.postApi('http://localhost:8080/quiz/update', this.returnData).subscribe(
        (res: any) => {
         console.log(res);
          return alert('已成功修改並儲存發布');
        }
      );
    }

    // 清空資料
    this.questService.questSurveyData = "";
    this.questService.questTopicData = [];
    this.questService.returnData = [];
    this.questService.quizId = 0;
    this.questService.isEdit = true;

    this.router.navigate(['/list-search']);
  }

}
