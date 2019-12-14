import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from './../../environments/environment';
import { WeatherService } from './../model/_services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnDestroy {
  public weatherChart: Array<Chart> = [];
  private city: string = environment.weather.city;
  private subscription: Subscription;

  constructor(private http: HttpClient, private weathService: WeatherService) {
    this.subscription = weathService
      .getWeather(this.city)
      .subscribe((data: any) => {
        // tslint:disable-next-line:no-string-literal
        const list = Object.assign(data['list']);
        // console.log(data);
        const temperatures = list.map((o: any) => o.main.temp);
        const dates = list.map((o: any) => o.dt_txt);
        // console.log(temperatures);
        // console.log(dates);

        this.weatherChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: temperatures,
                borderColor: '#0eb4f1',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
              // position: 'top'
              // labels: {
              //   fontColor: 'red'
              // }
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
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
