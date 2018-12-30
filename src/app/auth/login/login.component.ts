import {OnDestroy, OnInit} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {Subscription} from 'rxjs';

export class LoginComponent extends NbLoginComponent implements OnInit, OnDestroy {

    loginService: Subscription;

    ngOnInit() {
        this.loginService = this.service.getToken()
            .subscribe(token => {
                if (token.isValid()) {
                    console.log('I am redirecting from here');
                    // Navigate the employee to the product staticPage
                    this.router.navigateByUrl('/pages/dashboard');
                }
            });
    }

    ngOnDestroy() {
        this.loginService.unsubscribe();
    }
}