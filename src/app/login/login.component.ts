import { Component, OnInit } from '@angular/core';

// import { AuthService } from '../shared/auth/auth.service';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  // login(userEmail, userPassword) {
  //   if (this.authService.login(userEmail, userPassword)) {
  //     this.route.navigate(['/administrator']);
  //   } else {
  //     alert('Error!');
  //   }
  // }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user)
      document.cookie = 'token=' + userData.token;
      console.log(document.cookie);
      this.router.navigate(['/home']);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
