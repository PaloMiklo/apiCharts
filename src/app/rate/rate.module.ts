import { RateService } from './../model/_services/rate.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RateComponent } from './rate.component';

const routing = RouterModule.forChild([
  { path: '', component: RateComponent },
  { path: '**', redirectTo: 'rate' }
]);

@NgModule({
  imports: [CommonModule, routing],
  providers: [RateService],
  declarations: [RateComponent]
})
export class RateModule {}
