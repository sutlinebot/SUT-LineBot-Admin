import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-del-intent',
  templateUrl: './del-intent.component.html',
  styleUrls: ['./del-intent.component.css']
})
export class DelIntentComponent implements OnInit {

  intentlist;
  constructor(private myapi: DialogflowService) { }

  ngOnInit() {
    this.getintentList();
  }
  getintentList() {
    this.myapi.getIntentList().subscribe((data: any) => {
      this.intentlist = data.intents;
      console.log(data);
    });
  }
  delIntent(myform) {
    this.myapi.deleteIntent(myform.name.name).subscribe(data => {
      alert('ลบ ' + myform.name.displayName + ' แล้ว');
      this.getintentList();
    });
  }
}
