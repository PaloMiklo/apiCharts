import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeService {
  private currency: string = environment.rate.currency;
  private url: string = environment.rate.url;

  public date: string;
  public currVal: number;

  private dateSource = new BehaviorSubject<any>(this.date);
  public initDate$ = this.dateSource.asObservable();

  private currSource = new BehaviorSubject<any>(this.currVal);
  public initCurrVal$ = this.currSource.asObservable();

  private sendDate(d: string) {
    this.dateSource.next(d);
  }
  private sendCurrVal(val: number) {
    this.currSource.next(val);
  }

  constructor(private http: HttpClient) {
    this.initializeDate();
    this.initializeCurrValue();
  }

  public initializeCurrValue(): void {
    this.http
      .get<object>(`${this.url}${this.currency}`)
      .toPromise()
      .then((o: any) => {
        this.currVal = o.rates['CZK'];
        // console.log(this.currVal);
        this.sendCurrVal(this.currVal);
      })
      .catch(() =>
        console.log('Error occured while initializing the RateValue!')
      );
  }

  public initializeDate(): void {
    this.http
      .get<object>(`${this.url}${this.currency}`)
      .toPromise()
      .then((o: any) => {
        // console.log(o['date'] + new Date().toLocaleTimeString());
        this.date = o['date'] + ' ' + new Date().toLocaleTimeString();
        this.sendDate(this.date);
      })
      .catch(() =>
        console.log('Error occured while initializing the RateDate!')
      );
  }
}
