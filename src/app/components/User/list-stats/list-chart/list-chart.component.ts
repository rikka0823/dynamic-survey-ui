import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-list-chart',
  standalone: true,
  imports: [],
  templateUrl: './list-chart.component.html',
  styleUrl: './list-chart.component.scss'
})
export class ListChartComponent {
  @Input() dataId!: string; // 父層（ListStatsComponent）的 questId 傳給子層的 dataId
  @Input() questData! :any; // 父層（ListStatsComponent）的 questStas.questArray 傳給子層的 questData

  // <canvas>元素在確定被渲染完畢後，才開始製作圖表
  ngAfterViewInit(): void {
    this.createBar();
  }

  createBar() {
    // 獲取canvas元素
    // 使用questId當作canvas的ID來分類，否則ID重複，程式會失敗
    let ctx = document.getElementById(this.dataId) as HTMLCanvasElement;

    // 設定數據
    let data = {
      // x軸文字
      labels: this.questData.labels,
      datasets: [
        {
          // 上方分類文字
          label: '人數',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          // 數據
          data: this.questData.data,
          // 線與邊框顏色
          backgroundColor: this.questData.color,
        },
      ],
    };

    // 圖表選項
    var options = {
      scales: {
        y: {
          // y 軸從 0 開始
          beginAtZero: true,
        },
      },
    };

    if (ctx) {
      // 創建圖表
      let chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
  }
}
