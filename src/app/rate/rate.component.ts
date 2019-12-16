import { HomeService } from './../home/home.service';
import { Chart } from 'chart.js';
import { environment } from './../../environments/environment';
import { Component, OnDestroy, Input } from '@angular/core';

import { RateService } from './../model/_services/rate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnDestroy {
  public rateChart: Chart = [];
  public date: string | any;
  public amount: number;
  public start = false;

  private currency: string = environment.rate.currency;
  private subscription: Subscription;
  private timer: any;

  private initialDate: string;
  private initCurrVal: number;

  constructor(
    private rateService: RateService,
    private homeService: HomeService
  ) {

    this.homeService.initDate$.subscribe(date => (this.initialDate = date));
    this.homeService.initCurrVal$.subscribe(val => (this.initCurrVal = val));
    // console.log(this.initialDate);
    // console.log(this.initCurrVal);

    this.subscription = rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        const curr = o.rates['CZK'];
        this.amount = curr;
        this.date = o['date'] + new Date().toLocaleTimeString();

        this.rateChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: [this.initialDate],
            datasets: [
              {
                data: [this.initCurrVal],
                borderColor: '#B22222',
                fill: true,
                fillColor: '#ffff00'
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: true
                }
              ],
              yAxes: [
                {
                  display: true
                }
              ]
            }
          }
        });
      });
    this.timer = setInterval(() => {
      this.getValues();
      this.getDates();
    }, 2000);
  }

  private getValues() {
    this.subscription = this.rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        const curr = o.rates['CZK'];
        this.amount = curr;
        this.rateChart['data'].datasets.forEach(dataset => {
          dataset.data.push(curr);
        }),
          this.rateChart.update();
      });
  }

  private getDates(): void {
    this.subscription = this.rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        this.date = o['date'] + ' ' + new Date().toLocaleTimeString();
        this.rateChart['data'].labels.push(this.date);
        this.rateChart.update();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }
}
