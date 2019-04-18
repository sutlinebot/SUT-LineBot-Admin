import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  intentlist;
  constructor(private myapi: DialogflowService) { }
  ngOnInit() {
  }
}
