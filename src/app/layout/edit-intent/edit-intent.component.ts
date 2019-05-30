import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../../shared/api/dialogflow.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-intent',
  templateUrl: './edit-intent.component.html',
  styleUrls: ['./edit-intent.component.css']
})
export class EditIntentComponent implements OnInit {

  intents;

  constructor( private myapi: DialogflowService, private http: HttpClient,private router: Router) { }

  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }
    this.getintentList();
  }

  getintentList() {
    this.myapi.getIntentList().subscribe((data: any) => {
      this.intents = data.intents;
      this.intents
        .map((cur, index, arr) => {
          this.intents[index] = [cur.displayName, cur.name]
        });
    });
  }

  editIntent(data){
    //console.log(data);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "data": JSON.stringify(data)
      }
    };
    this.router.navigate(['/edit-single'],navigationExtras);
  }

  isLogin(){
    const token = document.cookie.split('=')[2];
    if(token != null) {
      return false;
    }
    return true;
  }
  

}
