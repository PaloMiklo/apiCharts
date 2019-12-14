import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      {
        path: 'weather',
        loadChildren: () =>
          import('./weather/weather.module').then(m => m.WeatherModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'rate',
        loadChildren: () => import('./rate/rate.module').then(m => m.RateModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],

  imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true })],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
