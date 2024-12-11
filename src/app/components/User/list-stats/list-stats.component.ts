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



  // questStas = {
  //   questionTitle: this.quizName,
  //   questArray: [
  //     {
  //       questId: '1',
  //       questName: '推し活をする主な目的は何ですか？',
  //       type: 'M',
  //       labels: ['楽しみ・気分転換のため', '仲間と交流するため', '応援・貢献するため', 'その他'],
  //       data: [3000, 200, 100, 200],
  //       color: ['red', 'blue', 'green', 'yellow']
  //     },
  //     {
  //       questId: '2',
  //       questName: '最推しを選んでください',
  //       type: 'Q',
  //       labels: ['星街すいせい', 'さくらみこ', '結城さくな', 'その他'],
  //       data: [2000, 2020, 1030, 200],
  //       color: ['red', 'blue', 'green', 'yellow'],
  //     },
  //     {
  //       questId: '3',
  //       questName: '最推しの理由を説明してください',
  //       type: 'T',
  //       labels: [],
  //       data: ['すいちゃん、歌うまい', 'みこち好き', 'さくたんかわいい'],
  //       color: ['red', 'blue', 'green', 'yellow'],
  //     }
  //   ]
  // }
}
