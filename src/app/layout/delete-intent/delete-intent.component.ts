import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogflowService } from '../../shared/api/dialogflow.service';

@Component({
    selector: 'delete-intent',
    templateUrl: './delete-intent.component.html',
    styleUrls: ['./delete-intent.component.scss']
})
export class DeleteIntentComponent implements OnInit {
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
