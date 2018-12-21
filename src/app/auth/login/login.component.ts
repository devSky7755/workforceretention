import {AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {Subscription} from 'rxjs';

export class LoginComponent extends NbLoginComponent implements OnInit, OnDestroy, AfterViewInit {

    loginService: Subscription;

    ngOnInit() {

    }

    ngOnDestroy() {
        this.loginService.unsubscribe()
    }

    ngAfterViewInit() {
        this.loginService = this.service.getToken()
            .subscribe(token => {
                if (token.isValid()) {
                    // Navigate the employee to the product staticPage
                    this.router.navigate(['pages']);
                }
            })
    }

}