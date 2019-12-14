import { Chart } from 'chart.js';
import { environment } from './../../environments/environment';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RateService } from './../model/_services/rate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnDestroy {
  public rateChart: Chart = [];
  public amount: number;
  public date: string | any;
  public start = false;

  private timer: any;
  private currency: string = environment.rate.currency;
  private subscription: Subscription;

  constructor(private http: HttpClient, private rateService: RateService) {
    this.subscription = rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        const czk = o.rates['CZK'];
        this.amount = czk;
        this.date = o['date'] + new Date().toLocaleTimeString();

        this.rateChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                data: [],
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
      this.getDates();
      this.getValues();
    }, 1000);
  }

  getDates() {
    this.subscription = this.rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        const czk = o.rates['CZK'];
        this.amount = czk;
        this.rateChart['data'].datasets.forEach(dataset => {
          dataset.data.push(czk);
        }),
          this.rateChart.update();
      });
  }

  getValues(): void {
    this.subscription = this.rateService
      .getRate(this.currency)
      .subscribe((o: any) => {
        this.date = o['date'] + new Date().toLocaleTimeString();
        this.rateChart['data'].labels.push(this.date);
        this.rateChart.update();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }
}
