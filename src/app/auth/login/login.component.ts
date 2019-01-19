import {OnDestroy, OnInit} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {Subscription} from 'rxjs';

export class LoginComponent extends NbLoginComponent implements OnInit, OnDestroy {

    loginService: Subscription;

    ngOnInit() {
    }

    ngOnDestroy() {
        this.loginService.unsubscribe();
    }
}
