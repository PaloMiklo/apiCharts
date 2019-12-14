import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private url: string = environment.weather.url;
  private apiKey: string = environment.weather.apiKey;
  private units: string = environment.weather.units;

  constructor(private http: HttpClient) {}

  public getWeather(city: string): Observable<object> {
    return this.http.get<object>(
      `${this.url}${city}&APPID=${this.apiKey}&units=${this.units}`
    );
  }
}
