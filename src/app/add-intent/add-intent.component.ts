import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-intent',
  templateUrl: './add-intent.component.html',
  styleUrls: ['./add-intent.component.css']
})
export class AddIntentComponent implements OnInit {

  intentlist;
  constructor(private myapi: DialogflowService) { }

  ngOnInit() {
  }

  addIntent(myform) {
    this.myapi.addIntent(myform).subscribe(data => {
      alert('เพิ่ม ' + myform.displayName + ' แล้ว');
    });
  }
}
