import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'ng4-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isLogin(){
    const token = document.cookie.split('=')[2];
    if(token != null) {
      return false;
    }
    return true;
  }

  signOut(): void {
    console.log('sign out')
    this.authService.signOut();
    document.cookie = 'token' + ' =; expires = Thu, 01 Jan 1970 00:00:00 UTC';
  }

}
