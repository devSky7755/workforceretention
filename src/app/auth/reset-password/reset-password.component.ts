/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService, NbResetPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'nb-reset-password-page',
    styleUrls: ['./reset-password.component.scss'],
    templateUrl: './reset-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnInit {
    token: string;

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.token = params.token || "";
            });
    }

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router,
        private route: ActivatedRoute) {
        super(service, options, cd, router)
    }

    resetPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.resetPassword(this.strategy, {
            token: this.token,
            ...this.user
        }).subscribe((result: NbAuthResult) => {
            this.submitted = false;
            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else {
                this.errors = result.getErrors();
            }

            // const redirect = result.getRedirect();
            // if (redirect) {
            //     setTimeout(() => {
            //         return this.router.navigateByUrl(redirect);
            //     }, this.redirectDelay);
            // }
            this.cd.detectChanges();
        });
    }
}