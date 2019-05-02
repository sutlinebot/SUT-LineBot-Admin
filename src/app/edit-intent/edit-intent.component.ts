import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-intent',
  templateUrl: './edit-intent.component.html',
  styleUrls: ['./edit-intent.component.css']
})
export class EditIntentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }

  }

  isLogin(){
    const token = document.cookie.split('=')[2];
    if(token != null) {
      return false;
    }
    return true;
  }

}
