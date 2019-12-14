import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class RateService {
  private url: string = environment.rate.url;

  constructor(private http: HttpClient) {}

  public getRate(curency: string): Observable<object> {
    return this.http.get<object>(`${this.url}${curency}`);
  }
}
