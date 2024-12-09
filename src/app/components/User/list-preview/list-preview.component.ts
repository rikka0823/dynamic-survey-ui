import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestResService } from '../../../@services/questRes.service';
import { AccessService } from '../../../@services/access.service';
import { DateService } from '../../../@services/date.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-preview',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-preview.component.html',
  styleUrl: './list-preview.component.scss'
})
export class ListPreviewComponent {
  questResData!: any;

  constructor(
    private questResService: QuestResService,
    private router: Router,
    private accessService: AccessService,
    private dateService: DateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 將qustResService資料帶到預覽頁
    this.questResData = this.questResService.questResData;

  }

  navigateToListRespond() {
    this.router.navigate(['/list-respond']);
  }

  navigateToListPage() {
    let newAnswer: {[key: number] : Array<string>} = {};

    for (let item of this.questResService.questResData.quesList) {

      const { quesId, type, answer, radioAnswer, options } = item;


      if (type == 'text') {
          newAnswer[quesId] = [answer];
      }

      if (type == 'single') {
          if (radioAnswer) {
              const selectedOption = options.find((option: any) => option.code == radioAnswer);
              if (selectedOption) {
                  newAnswer[quesId] = [selectedOption.optionName];
              }
          }
      }

      if (type == 'multi') {
          const selectedOptions = options.filter((option: any) => option.boxBoolean).map((option: any) => option.optionName);
          if (selectedOptions.length > 0) {
              newAnswer[quesId] = selectedOptions;
          }
      }

    }

    this.questResService.fillinData = {
      quizId: this.questResService.quizId,
      userName: this.questResService.questResData.userName,
      phone: this.questResService.questResData.userPhone,
      email: this.questResService.questResData.userEmail,
      age: this.questResService.questResData.userAge,
      answer: newAnswer,
      fillinDate: this.dateService.changeDateFormat(new Date())
    }

    let code;
    this.http.post('http://localhost:8080/quiz/fillin',  this.questResService.fillinData).subscribe((res: any) => {
      console.log(res);
      code = res;
    });

    if (code != 200) {
      return alert('請勿重複填寫');
    }

    console.log(this.questResService.fillinData);
    // 儲存前淨空資料
    this.questResService.questResData = "";
    this.questResService.quizAllData = "";
    this.questResService.fillinData = undefined;

    alert('儲存成功');

    this.router.navigate(['/list-search']);
  }

  getIsAdmin(): boolean {
    return this.accessService.getIsAdmin();
  }

  navigateToAd() {
    this.router.navigate(['/list-tabs-ad/list-feedbook-ad']);
  }
}
