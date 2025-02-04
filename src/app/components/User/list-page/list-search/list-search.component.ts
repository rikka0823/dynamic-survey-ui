import { Component, ViewChild } from '@angular/core';
import { ListTableComponent } from '../list-table/list-table.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DateService } from '../../../../@services/date.service';
import { AccessService } from '../../../../@services/access.service';

@Component({
  selector: 'app-list-search',
  standalone: true,
  imports: [FormsModule,
    ListTableComponent,
    MatIconModule,
  ],
  templateUrl: './list-search.component.html',
  styleUrl: './list-search.component.scss'
})
export class ListSeacchComponent {
  surveyName!: string;
  startDate!: string; // 儲存開始時間
  endDate!: string; // 儲存結束時間
  minDate!: string; // 起始日期可選擇的初始值
  maxDate!: string; // 起始日期可選擇的最大值
  endMaxDate!: string; // 結束日期可選擇的最大值

  @ViewChild(ListTableComponent) listTableComponent!: ListTableComponent;

  constructor(
    private accessService: AccessService,
    private dateService: DateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 可選擇初始值為當天
    this.minDate = this.dateService.changeDateFormat(new Date());
    // 最大值為加30天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 30));
  }

  // 登入
  logIn() {
    this.accessService.setIsAdmin(true);
    this.router.navigate(['/list-logIn-ad'])
  }

  // 登出
  logOut() {
    this.accessService.setIsAdmin(false);
    window.location.reload();
  }

  // 獲取登入狀態
  getIsAdmin(): boolean {
    return this.accessService.getIsAdmin();
  }

  // 限制結束日期可選擇的最大值為開始時間+30日
  changeDate() {
    this.endMaxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(this.startDate), 30));
  }

  // 即時搜尋
  onSearch() {
    this.listTableComponent.searchList(this.surveyName, this.startDate, this.endDate);

    // 搜尋完後選項淨空
    this.surveyName = '';
    this.startDate = '';
    this.endDate = '';
  }
}
