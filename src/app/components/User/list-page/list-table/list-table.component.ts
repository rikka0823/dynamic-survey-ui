import { FeedBackService } from './../../../../@services/feedback.service';
import { StatsService } from './../../../../@services/stats.sservice';
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AccessService } from '../../../../@services/access.service';
import { HttpClientService } from '../../../../@services/http-client.service';
import { DateService } from '../../../../@services/date.service';
import { CommonModule } from '@angular/common';
import { QuestResService } from '../../../../@services/questRes.service';
import { QuestService, QuizData } from '../../../../@services/quest.service';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    RouterLink,
    MatCheckboxModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'startDate', 'endDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  quizData: QuizData[] = [];
  selectedIds: number[] = []; // 儲存被選中的id




  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.addSelect();

    this.questService.getQuizData().subscribe((res: any) => {
      const quizData = res.quizList;

      // 使用 for 迴圈來過濾資料
      const tableData: PeriodicElement[] = [];

      for (let i = 0; i < quizData.length; i++) {
        const quiz = quizData[i];
        let status: string;

        // 管理員處理：顯示所有資料
        // 非管理員處理：過濾掉尚未發布的 quiz
        if (!this.getIsAdmin() && quiz.published == false) {
          continue;  // 如果不是管理員且 quiz.published == false，跳過該筆資料
        }

        // 設置狀態
        if (quiz.published == false && this.accessService.getIsAdmin()) {
          status = '尚未發布';
        } else if (
          quiz.endDate >= this.dateService.changeDateFormat(new Date()) &&
          this.dateService.changeDateFormat(new Date()) >= quiz.startDate
        ) {
          status = '進行中';
        } else if (this.dateService.changeDateFormat(new Date()) < quiz.startDate) {
          status = '尚未開始';
        } else {
          status = '已結束';
        }

        // 將符合條件的資料加入 tableData 陣列
        tableData.push({
          id: quiz.id,
          name: quiz.name,
          startDate: quiz.startDate,
          endDate: quiz.endDate,
          status: status,
          result: '前往',
          description: quiz.description
        });
      }

      // 將 tableData 資料設定到 MatTableDataSource
      this.dataSource.data = tableData;
      this.dataSource.paginator = this.paginator!;  // 設置分頁器

    });
  }

  constructor(
    private router: Router,
    private accessService: AccessService,
    private http: HttpClientService,
    private questService: QuestService,
    private dateService: DateService,
    private questResService: QuestResService,
    private statsService: StatsService,
    private feedBackService: FeedBackService
  ) { }

  // 初始化後，後面的組件或service等如有渲染，
  // 狀態除非重整，不然無法再次初始化，故需要使用ngDoCheck()偵測頁面的值，變更觸發
  ngDoCheck(): void {
    this.displayedColumns = ['id', 'name', 'status', 'startDate', 'endDate', 'result'];
    this.addSelect();
  }

  addSelect() {
    if (this.accessService.getIsAdmin()) {
      this.displayedColumns.unshift('select'); // 將'select'放入陣列最前面
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  addSurvey() {
    this.router.navigate(['/list-tabs-ad/list-survey-ad']);
  }

  getIsAdmin(): boolean {
    return this.accessService.getIsAdmin();
  }

  navigateToFeedBack() {
    return '/list-tabs-ad/list-feedback-ad';
  }

  getStatsId(id: number) {
    this.feedBackService.quizId = id;
    this.statsService.quizId = id;
    this.questService.quizId = id;
  }

  searchList(inputData: string, chooseSDate: string, chooseEDate: string) {
    let searchData = {
      name: inputData,
      startDate: chooseSDate,
      endDate: chooseEDate
    };

    this.http.postApi('http://localhost:8080/quiz/search', searchData).subscribe((res: any) => {
      const quizData = res.quizList;

      // 使用 for 迴圈來過濾資料
      const tableData: PeriodicElement[] = [];

      for (let i = 0; i < quizData.length; i++) {
        const quiz = quizData[i];
        let status: string;


        if (!this.getIsAdmin() && quiz.published == false) {
          continue;  // 如果不是管理員且 quiz.published == false，跳過該筆資料
        }

        // 設置狀態
        if (quiz.published === false && this.accessService.getIsAdmin()) {
          status = '尚未發布';
        } else if (
          quiz.endDate >= this.dateService.changeDateFormat(new Date()) &&
          this.dateService.changeDateFormat(new Date()) >= quiz.startDate
        ) {
          status = '進行中';
        } else if (this.dateService.changeDateFormat(new Date()) < quiz.startDate) {
          status = '尚未開始';
        } else {
          status = '已結束';
        }

        // 將符合條件的資料加入 tableData 陣列
        tableData.push({
          id: quiz.id,
          name: quiz.name,
          startDate: quiz.startDate,
          endDate: quiz.endDate,
          status: status,
          result: '前往',
          description: quiz.description
        });
      }

      // 更新表格資料
      this.dataSource.data = tableData;

      // 確保分頁器在資料更新後重新設置
      if (this.paginator) {
        this.paginator.pageIndex = 0;  // 每次更新資料時都從第一頁開始
      }
    });
  }

  onCheckboxChange(id: number, isChecked: boolean) {
    if (isChecked) {
      // 若選中，則放入
      this.selectedIds.push(id);
    } else {
      const index = this.selectedIds.indexOf(id);
      if (index >= 0) {
        // 取消選中，則移除
        this.selectedIds.splice(index, 1);
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }

  deleteQuiz() {
    if (this.selectedIds.length == 0) {
      return alert('請選擇刪除項目');
    }

    let quizIdList = this.selectedIds;
    let deleteList = { 'quizIdList': quizIdList };

    this.http.postApi('http://localhost:8080/quiz/delete', deleteList).subscribe((res: any) => {
      alert('確認刪除');

      // 清空選中的 quiz ID 和選擇狀態
      this.selectedIds = [];
      this.selection.clear(); // 清除選中的行

      // 刪除成功後，重新獲取資料
      this.questService.getQuizData().subscribe((res: any) => {
        const quizData = res.quizList;
        const tableData: PeriodicElement[] = quizData.map((quiz: QuizData) => {
          let status!: string;

          // 判斷狀態
          if (quiz.published === false) {
            status = '尚未發布';
          } else if (
            quiz.endDate >= this.dateService.changeDateFormat(new Date()) &&
            this.dateService.changeDateFormat(new Date()) >= quiz.startDate
          ) {
            status = '進行中';
          } else if (this.dateService.changeDateFormat(new Date()) < quiz.startDate) {
            status = '尚未開始';
          } else {
            status = '已結束';
          }

          return {
            id: quiz.id,
            name: quiz.name,
            startDate: quiz.startDate,
            endDate: quiz.endDate,
            status: status,
            result: '前往',
          };
        });

        // 更新表格資料
        this.dataSource.data = tableData;
      });
    });
  }

  getRowDataById(id: number): PeriodicElement | undefined {
    return this.dataSource.data.find((element: PeriodicElement) => element.id == id);
  }

  getQuizId(quizId: number) {
    const quizData = this.getRowDataById(quizId);

    this.questResService.quizAllData =  {
      name: quizData?.name,
      startDate: quizData?.startDate,
      endDate: quizData?.endDate,
      description: quizData?.description
    }

    this.questResService.quizId = quizId;
  }

  navigateToQuiz(element: PeriodicElement): string {
    if (!this.getIsAdmin()) {
      if (element.status == '進行中') {
        return '/list-respond';
      }
    }
    return '/list-respond';
  }

  editSurvey() {
    if (this.selectedIds.length == 0) {
      return alert('請選擇編輯項目');
    }

    if (this.selectedIds.length > 1) {
      return alert('請選擇特定編輯項目');
    }

    this.questService.quizId = this.selectedIds[0];
    this.questService.isEdit = true;

    this.router.navigate(['/list-tabs-ad/list-survey-ad']);
  }
}

export interface PeriodicElement {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  result: string;
  description: string;
}




