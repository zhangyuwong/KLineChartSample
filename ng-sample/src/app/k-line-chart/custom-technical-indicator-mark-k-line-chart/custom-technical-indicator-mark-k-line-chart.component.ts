import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { init, dispose, Chart } from 'klinecharts';

import generatedKLineDataList from '../../generatedKLineDataList';

@Component({
  selector: 'app-custom-technical-indicator-mark-k-kline-chart',
  templateUrl: './custom-technical-indicator-mark-k-line-chart.component.html',
})
export class CustomTechnicalIndicatorMarkKLineChartComponent implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    const kLineChart: Chart = init('custom-technical-indicator-mark-k-line');
    kLineChart.createPane('technicalIndicator', { height: 150, technicalIndicatorType: 'MACD' });
    kLineChart.subscribeDrawAction('drawTechnicalIndicator', (data) => {
      const { ctx, coordinate, technicalIndicatorData } = data;
      if (technicalIndicatorData.macd > 5) {
        ctx.font = '12px';
        const text = `${technicalIndicatorData.macd.toFixed(4)}`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(text, coordinate.x, coordinate.macd + 6);
      }
    });
    kLineChart.applyNewData(generatedKLineDataList());
  }

  ngOnDestroy(): void {
    dispose('custom-technical-indicator-mark-k-line');
  }
}
