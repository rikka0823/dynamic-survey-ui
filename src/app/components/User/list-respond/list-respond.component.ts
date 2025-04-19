import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestResService } from '../../../@services/questRes.service';
import { HttpClientService } from '../../../@services/http-client.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-respond',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-respond.component.html',
  styleUrl: './list-respond.component.scss'
})
export class ListRespondComponent {
  name!: string;
  startDate!: string;
  endDate!: string;
  description!: string;
  quesList!: any;
  quest!: any;

  userName!: string;
  userPhone!: string;
  userEmail!: string;
  userAge!: string;
  saveDataArray!: Array<any>; // 建立新陣列儲存已填寫的資料

  constructor(
    private questResService: QuestResService,
    private router: Router,
    private http: HttpClientService
  ) {}

  async ngOnInit(): Promise<void> {
    let quesListRes!: any;

    quesListRes = await firstValueFrom(this.http.getApi('/api/quiz/getQuesData?quizId=' + this.questResService.quizId));

    let newQuesList: any[] = [];
    quesListRes.quesList.map((item: any) => {
      const options = JSON.parse(item.options);

      const quesList = {
        quesId: item.quesId,
        required: item.required,
        quesName: item.quesName,
        type: item.type,
        options: options
      }

      newQuesList.push(quesList);
    });

    this.questResService.quizAllData = {
      ...this.questResService.quizAllData,
      quesList: newQuesList
    }

    this.quesList = this.questResService.quizAllData.quesList;

    this.name = this.questResService.quizAllData.name;
    this.startDate = this.questResService.quizAllData.startDate;
    this.endDate = this.questResService.quizAllData.endDate;
    this.description = this.questResService.quizAllData.description;
    this.quest = {
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
      quesList:  this.quesList || []
    };

    // 若service中無資料，表示尚未進入預覽頁，須建立saveDataArray儲存資料
    if (!this.questResService.questResData) {
      this.tidyQuestData();
    } else {
      // 若有資料，表示回上一頁，須將使用者的資料重新放入
      this.userName = this.questResService.questResData.userName;
      this.userPhone = this.questResService.questResData.userPhone;
      this.userEmail = this.questResService.questResData.userEmail;
      this.userAge = this.questResService.questResData.userAge;
      this.saveDataArray = this.questResService.questResData.quesList;
    }
  }

  // 將原本的問題陣列新增answer和radioAnswer欄位，來存放答案
  // 並在每一個optionName中新增boxBoolean，來判斷checkBox是否勾選
  tidyQuestData() {
    this.saveDataArray = this.quest.quesList.map((array: any) => ({
      ...array, // 原本的內容
      answer: "",
      radioAnswer: '',
      options: array.options.map((option: any) => ({ ...option, boxBoolean: false }))
    }));
  }

  isValidAnswer(quest: any): boolean {
    if (quest.type === 'multi') {
      return quest.options.some((option: any) => option.boxBoolean); // 如果有true即return
    } else if (quest.type === 'single') {
      return !!quest.radioAnswer; // !!：表示將資料型別轉換為boolean
    } else {
      return !!quest.answer;
    }
  }

  checkNeed(): boolean {
    if (!this.userName || !this.userEmail) {
      alert('請確認必填皆有填寫');
      return false;
    }

    for (let quest of this.saveDataArray) {
      if (quest.required && !this.isValidAnswer(quest)) {
        alert('請確認必填皆有填寫');
        return false;
      }
    }

    return true;
  }

  navigateToList() {
    this.router.navigate(['/list-search']);
  }

  navigateToPreview() {
    if (this.checkNeed()) {
      // 把所有資料儲存至quesResService
      this.questResService.questResData = {
        name: this.quest.name,
        startDate: this.quest.startDate,
        endDate: this.quest.endDate,
        description: this.quest.description,
        userName: this.userName,
        userPhone: this.userPhone,
        userEmail: this.userEmail,
        userAge: this.userAge,
        quesList: this.saveDataArray
      }
      this.router.navigate(['/list-preview']);
    };
  }
}
