import { WeatherService } from './../model/_services/weather.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { RouterModule } from '@angular/router';

const routing = RouterModule.forChild([
  { path: '', component: WeatherComponent },
  { path: '**', redirectTo: 'weather' }
]);

@NgModule({
  imports: [CommonModule, routing],
  providers: [WeatherService],
  declarations: [WeatherComponent]
})
export class WeatherModule {}
