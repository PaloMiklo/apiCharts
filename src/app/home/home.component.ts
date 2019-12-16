import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.initializeCurrValue();
    this.homeService.initializeDate();
  }
}
