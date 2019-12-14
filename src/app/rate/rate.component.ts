import { Chart } from 'chart.js';
import { environment } from './../../environments/environment';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RateService } from './../model/_services/rate.service';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnDestroy {
  public rateChart: Array<Chart> = [];
  public amount: number;
  public date: string | any;
  public time: string;
  public timeInterval: string;

  private currency: string = environment.rate.currency;
  private values: Array<number> = [];
  private dates: Array<number> = [];
  private lastValue: number;
  private lastDate: number;
  private subscription: Subscription;
  // private int = 0;

  // TODO
  constructor(private http: HttpClient, private rateService: RateService) {
    this.subscription = interval(1 * 1000) // call api request every 0.1 second
      .pipe(flatMap(() => rateService.getRate(this.currency)))
      .subscribe((o: any) => {
        // tslint:disable-next-line:no-string-literal
        const czk = o.rates['CZK'];
        this.amount = czk;
        this.values.push(czk);
        if (this.values.length === 5) {
          // this.lastValue = this.values[4];
          // this.values = [this.lastValue];
        }
        // this.int++;
        // tslint:disable-next-line:no-string-literal
        this.date = o['date'] + new Date().toLocaleTimeString();
        this.dates.push(this.date);
        // if (this.dates.length === 5) {
        // this.lastDate = this.dates[4];
        // this.dates = [this.lastDate];
        // this.int = 0;
        // }
        // this.dates.push(this.int);
        // if (this.dates.length === 5) {
        //   this.dates = [0];
        //   this.int = 0;
        // }
        // console.log(this.values);
        // console.log(this.dates);
        // console.log(o);

        this.rateChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.dates,
            datasets: [
              {
                data: this.values,
                borderColor: '#B22222',
                fill: false
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

    // setInterval(() => {
    //   this.timeInterval = new Date().toLocaleTimeString();
    // }, .1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
