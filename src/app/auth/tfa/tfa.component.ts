/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbTokenLocalStorage, NbTokenService } from '@nebular/auth';
import { UserService } from '../../@core/data/users.service';

@Component({
    selector: 'nb-tfa-page',
    styleUrls: ['./tfa.component.scss'],
    templateUrl: './tfa.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TfaComponent {
    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    form: any = {
        phone: "",
        token: "",
        code: "",
    };

    constructor(
        protected tokenService: NbTokenService,
        protected cd: ChangeDetectorRef,
        protected router: Router,
        private userService: UserService) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as {
            phone: string,
            token: boolean,
        };
        this.form = {
            ...state
        }
        if (!this.form.phone || !this.form.token) {
            this.router.navigateByUrl('/auth/login');
        }
    }

    tfaVerify(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        this.userService.verfiyTfaToken(this.form.phone, this.form.code, this.form.token).subscribe(
            data => {
                this.submitted = false;
                this.cd.detectChanges();
                this.tokenService.set(new NbAuthJWTToken(data.token, 'email'))
                setTimeout(() => {
                    return this.router.navigateByUrl('/pages');
                }, 0);
            },
            err => {
                this.errors = err.error.data.errors || ['Something went wrong, Please try again later!']
                this.submitted = false;
                this.cd.detectChanges();
            }
        );
    }

    handleRetry(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        this.userService.resendTfaToken(this.form.phone, this.form.token).subscribe(
            data => {
                this.submitted = false;
                this.messages = ['Verification Code is sent to your phone.']
                this.form = {
                    phone: data.phone,
                    token: data.tfa_token
                }
                this.cd.detectChanges();
            },
            err => {
                console.log(err);
                this.errors = err.error.data.errors || ['Something went wrong, Please try again later!']
                this.submitted = false;
                this.cd.detectChanges();
            }
        );
    }
}