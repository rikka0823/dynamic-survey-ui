import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-list-tabs-ad',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './list-tabs-ad.component.html',
  styleUrl: './list-tabs-ad.component.scss'
})
export class ListTabsAdComponent {
  links = [
   { path: '/list-tabs-ad/list-survey-ad', name: '問卷', status: false },
   { path: '/list-tabs-ad/list-topic-ad', name: '題目', status: true },
   { path: '/list-tabs-ad/list-feedback-ad', name: '回饋', status: false },
   { path: '/list-tabs-ad/list-stats', name: '統計', status: false }
  ];



  // 記錄當前選中選項卡的名稱，初始值設為第一個
  activeLink = this.links[0].name;

  // 綁定選項卡的變數類型
  tabPanel!: any;

  constructor(
    private router: Router,
  ) {
    // 訂閱路由事件流，當路由一發生變化，即發出事件
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        for (let link of this.links) {
          if (link.path == event.url) {
            // 如導航結束後所觸發事件的 url 是某個 path，將 activeLink 設為該選項讓選項卡名稱替換
            this.activeLink = link.name;
            link.status = false;
          } else {
            link.status = true;
          }

        }

      }
    });
  }






}
