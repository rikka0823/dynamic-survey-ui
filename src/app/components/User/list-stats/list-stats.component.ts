import { StatsService } from './../../../@services/stats.sservice';
import { Component } from '@angular/core';
import { ListChartComponent } from './list-chart/list-chart.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-stats',
  standalone: true,
  imports: [ListChartComponent],
  templateUrl: './list-stats.component.html',
  styleUrl: './list-stats.component.scss'
})
export class ListStatsComponent {
  statsData!: any; // raw stats data
  questStas!: any; // tidy stats data

  constructor(
    private statsService: StatsService
  ) {}

  async ngOnInit(): Promise<void> {
    let res!: any;

    // 取得 raw data
    res = await firstValueFrom(this.statsService.getStatsDataById(this.statsService.quizId));
    this.statsData = res.statisticVoList;

    // 重整物件
    this.questStas = this.statsData.reduce((result: any, item: any) => {
      // 初始化物件
      if (!result.questArray) {
        result.questArray = [];
        result.questionTitle = item.quizName;
      }

      const question = {
        questId: String(item.quesId),
        questName: item.quesName,
        labels: Object.keys(item.optionCountMap),
        data: Object.values(item.optionCountMap),
        color: item.optionCountMap ? ['rgba(75, 192, 192, 0.2)'] : []
      };

      result.questArray.push(question);

      return result;
    }, {});

    console.log(this.questStas);

  }
}
