import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../../shared/api/dialogflow.service';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-intent',
  templateUrl: './add-intent.component.html',
  styleUrls: ['./add-intent.component.css']
})
export class AddIntentComponent implements OnInit {
  intent;
  intentlist;
  delselect;
  constructor(private myapi: DialogflowService, private router: Router) { }

  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }
    this.getintentList();
  }

  addIntent(myform) {
    console.log(myform);
    this.myapi.addIntent(myform).subscribe(data => {
      alert('เพิ่ม ' + myform.displayName + ' แล้ว');
      this.getintentList();
    });
  }

  clear(myform: NgForm) {
    myform.resetForm();
  }

  isLogin() {
    const token = document.cookie.split('=')[2];
    if (token != null) {
      return false;
    }
    return true;
  }

  getintentList() {
    this.myapi.getIntentList().subscribe((data: any) => {
      this.intentlist = data.intents;
    });
  }
  delIntent(delselect) {
    this.myapi.deleteIntent(delselect).subscribe(data => {
      alert('delete success');
      window.location.reload();
    });
  }
}
