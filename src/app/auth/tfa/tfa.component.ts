/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService, NbResetPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';

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
        protected cd: ChangeDetectorRef,
        protected router: Router) {
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
        // TODO 
        // MAKE API CALL FOR TFA VERIFICATION
        {
            this.submitted = false;
            this.cd.detectChanges();
        }
    }

    handleRetry(): void {
        // TODO
        // MAKE API CALL FOR RESEND CODE
    }
}