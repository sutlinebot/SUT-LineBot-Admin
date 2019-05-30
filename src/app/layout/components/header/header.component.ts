import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'ng4-social-login';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    questionsRef: AngularFireList<any>;
    questions: any[];

    public pushRightClass: string;
    public userName: string;
    alert;
    constructor(public db: AngularFireDatabase, private translate: TranslateService,
                public router: Router, private authService: AuthService) {
        this.userName = localStorage.getItem('userName');
        this.questionsRef = db.list('question');
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.questionsRef.snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, value: action.payload.val() }));
          }).subscribe(items => {
            this.questions = items;
            console.log(this.questions);
            this.alert = this.questions.length;
          });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('userName');
        this.authService.signOut();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
