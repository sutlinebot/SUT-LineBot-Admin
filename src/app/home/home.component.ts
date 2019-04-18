import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../shared/api/dialogflow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myapi: DialogflowService) { }

  ngOnInit() {
    this.getintentList();
  }
  getintentList() {
    this.myapi.getIntentList().subscribe(data => {
      console.log(data);
    });
  }

}
