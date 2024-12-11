import { FeedBackService } from './../../../../@services/feedback.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { QuestResService } from '../../../../@services/questRes.service';

@Component({
  selector: 'app-list-feedback-ad',
  standalone: true,
  imports: [],
  templateUrl: './list-feedback-ad.component.html',
  styleUrl: './list-feedback-ad.component.scss'
})
export class ListFeedbackAdComponent {
  feedbackList!: any;
  ques!: any[];
  email!: string;
  id!: number;

  constructor(
    private router: Router,
    private feedBackService: FeedBackService,
    private questService: QuestResService
  ) { }


  async ngOnInit(): Promise<void> {
    this.id = this.feedBackService.quizId;

    this.ques = [];
    const quizId = this.id;
    let feedBackDataRes!: any;

    feedBackDataRes = await firstValueFrom(this.feedBackService.getFeedBackData(quizId));

    // 以email作為分組條件
    this.feedbackList = feedBackDataRes.feedbackDtoList.reduce((result: any, res: any) => {
      if (!result[res.email]) {
        result[res.email] = {
          userName: res.userName,
          fillinDate: res.fillinDate,
          email: res.email,
          age: res.age,
          quizDesc: res.quizDesc,
          phone: res.phone,
          quizName: res.quizName,
          questions: []  // 用來儲存問題列表
        };

        this.ques.push({
          userName: res.userName,
          fillinDate: res.fillinDate,
          email: res.email
        });
      }

      // 找到該email對應的物件
      const user = result[res.email];

      // 根據quesId進行二次分組，防止同樣的問題被重複添加
      const exist = user.questions.find((question: any) => question.quesId == res.quesId);
      if (!exist) {
        user.questions.push({
          quesId: res.quesId,
          quesName: res.quesName,
          answerStr: res.answerStr
        });
      }
      return result;
    }, {});
  }

  navigateToPreview(email: string) {
    this.feedBackService.feedBackData = this.feedbackList[email];
    this.router.navigate(['/list-feedback-pre-ad']);
  }

  navigateToList() {
    this.feedBackService.feedBackData = "";
    this.router.navigate(['/list-search']);
  }

  navigateToStats() {
    this.router.navigate(['/list-tabs-ad/list-stats']);
  }

}
