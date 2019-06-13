import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService, GoogleLoginProvider, SocialUser } from 'ng4-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
      document.cookie = 'token=' + userData.token;
      // console.log(document.cookie);
      this.onLoggedin(this.user.name,this.user.photoUrl);
      this.router.navigate(['/dashboard']);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }


  onLoggedin(userName: string,photoUrl: string) {
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('userName', userName);
    localStorage.setItem('photoUrl', photoUrl);
  }
}
