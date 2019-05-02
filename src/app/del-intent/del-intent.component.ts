import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-del-intent',
  templateUrl: './del-intent.component.html',
  styleUrls: ['./del-intent.component.css']
})
export class DelIntentComponent implements OnInit {

  intentlist;
  constructor(private myapi: DialogflowService, private router: Router) { }

  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }
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

  isLogin(){
    const token = document.cookie.split('=')[2];
    if(token != null) {
      return false;
    }
    return true;
  }
}
