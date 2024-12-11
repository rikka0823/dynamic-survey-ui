import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { HttpClientService } from '../../../../@services/http-client.service';
import { QuestService } from '../../../../@services/quest.service';

@Component({
  selector: 'app-list-topic-ad',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list-topic-ad.component.html',
  styleUrl: './list-topic-ad.component.scss'
})
export class ListTopicAdComponent {
  quesId = 0;
  required = false; // 是否必填
  quesName!: string;
  type: string = ""; // 單選：single，多選：multi，文字：text
  optionName!: string;
  optionArray: Array<{ optionName: string, code: string }> = [];
  optionCode: string[] = ['A', 'B', 'C', 'D']; // 各個選項對應的code
  questArray: Array<any> = []  // 儲存當前加入問題資訊
  saveQuestArray!: any; // 儲存所有問題資訊的陣列
  questOptionId = 0;
  isEdit = false;
  editId = 0;
  selectedQuestIds: Set<number> = new Set(); // 儲存被選中的 id，以作刪除
  selectAll = false;

  constructor(
    private router: Router,
    private questService: QuestService,
    private http: HttpClientService
  ) { }

  async ngOnInit() {
    let quesDataRes!: any;
    let newQuesList: any;



    if (this.questService.isEdit) {
      quesDataRes = await firstValueFrom(this.questService.getQuesDataById(this.questService.quizId));
      console.log(quesDataRes);
      if (this.questService.questTopicData.length == 0) {
        quesDataRes.quesList.map((item: any) => {
          const options = JSON.parse(item.options);

          const quesList = {
            quesId: item.quesId,
            required: item.required,
            quesName: item.quesName,
            type: item.type,
            options: options
          }
          newQuesList = quesList;
          this.questService.questTopicData.push(newQuesList);
        });
      }
    }

    // 若有資料，表示回上一頁，須將使用者的資料重新放入
    if (this.questService.questTopicData) {
      this.questArray = this.questService.questTopicData.filter(quest => !this.selectedQuestIds.has(quest.quesId)); //
    }

    // 初始化選項，根據題型設置
    this.clearOption();
  }
  // 清空選項，並根據題型初始化選項
  clearOption() {
    this.optionName = '';
    this.optionArray = [];
    this.required = false;

    if (this.type === 'single' || this.type === 'multi') {
      // 初始化前兩個選項
      this.optionArray = [
        { optionName: '', code: 'A' },
        { optionName: '', code: 'B' }
      ];
    }
  }

  addOption() {
    if (this.optionArray.length < 4) {
      const nextCode = this.optionCode[this.optionArray.length]; // 依照選項順序對應code
      this.optionArray.push({ optionName: this.optionName, code: nextCode });
      this.optionName = ''; // 清空輸入框
    } else {
      alert('最多只能添加4個選項');
    }
  }

  removeOption(code: string) {
    if (this.optionArray.length <= 2) {
      alert('至少需要3個選項才能刪除');
      return;
    }

    //如果相等(false)，即刪除、過濾
    this.optionArray = this.optionArray.filter(option => option.code != code);
  }

  addQuest() {
    if (!this.quesName) {
      return alert('請填寫問題');
    }

    if (!this.type) {
      return alert('請填寫題型');
    }

    // 檢查輸入內容，避免輸入空值
    for (let option of this.optionArray) {
      if (option.optionName.trim() == '') {
        alert('請輸入選項內容');
        return;
      }

      if (option.optionName.length > 10) {
        alert('選項內容請勿超過10個字')
        return;
      }
    }

    if (this.type == 'multi' && this.optionArray.length < 2) {
      return alert('多選題至少需要 2 個選項');
    }

    if ((this.type == 'single' || this.type == 'multi') && this.optionArray.length == 0) {
      return alert('請添加至少一個選項');
    }

    // 使用現有問題的最大quesId來決定新問題的quesId
    this.quesId = this.questArray.length > 0 ? Math.max(...this.questArray.map(q => q.quesId)) + 1 : 1;

    // 新建newQuest方便進行測試，增加維護性
    const newQuest = {
      quesId: this.quesId,
      required: this.required,
      quesName: this.quesName,
      type: this.type,
      options: [...this.optionArray],
      checkBox: this.type == 'multi', // 多選題才有checkbox
      selected: false
    };

    this.questArray.push(newQuest);

    this.questService.questTopicData.push(newQuest);

    // 清空選項、問題、題型、必填
    this.optionArray = [];
    this.optionName = '';
    this.quesName = '';
    this.type = '';
    this.required = false;
    this.clearOption()
  }

  editQuest(quesId: number) {
    alert('編輯中');

    const quest = this.questArray.find(q => q.quesId == quesId);
    if (quest) {
      this.isEdit = true;
      this.editId = quesId;
      this.quesName = quest.quesName;

      // 把選項重新帶入
      if (quest.type == 'single') {
        this.type = 'single';
      } else if (quest.type == 'multi') {
        this.type = 'multi';
      } else {
        this.type = 'text';
      }


      this.required = quest.required;

      // 採用深拷貝，確保選內的物件內容是獨立
      this.optionArray = quest.options.map((option: any) => ({
        optionName: option.optionName,
        code: option.code
      }))
    }
  }

  saveEditQuest() {
    // 找到要編輯的id
    const editedQuestIndex = this.questArray.findIndex(q => q.quesId == this.editId);

    if (editedQuestIndex != -1) {
      const updatedQuest = {
        quesId: this.editId,
        required: this.required,
        quesName: this.quesName,
        type: this.type,
        options: [...this.optionArray],
        checkBox: this.type == 'multi',
        selected: false
      };

      // 更新questArray中的問題
      this.questArray[editedQuestIndex] = updatedQuest;

      // 更新questService.questTopicData中的問題
      const serviceQuestIndex = this.questService.questTopicData.findIndex((q: any) => q.quesId == this.editId);
      if (serviceQuestIndex != -1) {
        this.questService.questTopicData[serviceQuestIndex] = updatedQuest;
      }
    }

    // 再次重置
    this.type = "";
    this.isEdit = false;
    this.editId = 0;
    this.quesName = '';
    this.required = false;
    this.optionArray = [];
    this.optionName = '';
    this.clearOption();


  }

  deleteQuest() {
    if (this.selectedQuestIds.size == 0) {
      return alert('請至少選擇一個問題刪除');
    }

    // filter會過濾掉false條件下的元素
    this.questArray = this.questArray.filter(
      quest => !this.selectedQuestIds.has(quest.quesId)
    );

    // 同步更新 questService.questTopicData，移除被刪除的問題
    this.questService.questTopicData = this.questService.questTopicData.filter(
      quest => !this.selectedQuestIds.has(quest.quesId)
    );

    // 清空選中的問題，重置被選中id
    this.selectedQuestIds.clear();

    // 將全選刪除重置
    this.selectAll = false;
  }

  // 更新問題集合，以便處理刪除
  updateSelectedQuest(quesId: number, isSelected: boolean) {
    if (isSelected) {
      this.selectedQuestIds.add(quesId);
    } else {
      this.selectedQuestIds.delete(quesId);
    }
  }

  deleteAll() {
    this.questArray.forEach(quest => {
      quest.selected = this.selectAll;
      if (this.selectAll) {
        this.selectedQuestIds.add(quest.quesId); // 如全選，添加被選中的id
      } else {
        this.selectedQuestIds.clear(); // 清除已選中的id
      }
    });
  }

  saveQuest() {
    // 重整預覽問題資訊陣列
    let quesList: any[] = [];
    for (let quest of this.questService.questTopicData) {
      quesList.push({
        quesId: quest.quesId,
        required: quest.required,
        quesName: quest.quesName,
        type: quest.type,
        options: quest.options
      })
    }

    // 重整return回後端的陣列
    let returnData: any[] = [];
    for (let quest of this.questService.questTopicData) {
      returnData.push({
        quizId: this.questService.quizId ? this.questService.quizId : 0,
        quesId: quest.quesId,
        required: quest.required,
        quesName: quest.quesName,
        type: quest.type,
        options: JSON.stringify(quest.options)
      })
    }

    this.questService.questTopicData = quesList;
    this.questService.returnData = returnData;
  }

  navigateToListSurvey() {
    this.router.navigate(['/list-tabs-ad/list-survey-ad']);
  }

  navigateToListPreview() {
    // 如果選項未完整填寫
    if (this.questArray.length == 0) {
      alert('請填寫完整題目資訊');
      return;
    }

    // 如果題目未完整填寫
    if (!this.questService.questSurveyData) {
      alert('請填寫完整問卷資訊');
      return;
    }
    if (
      !this.questService.questSurveyData.name ||
      !this.questService.questSurveyData.description ||
      !this.questService.questSurveyData.startDate ||
      !this.questService.questSurveyData.endDate
    ) {
      alert('請填寫完整問卷資訊');
      return;
    }

    this.saveQuest();

    this.router.navigate(['/list-preview-ad']);
    console.log(this.questService.returnData);
  }
}
