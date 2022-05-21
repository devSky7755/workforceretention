/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbAuthResult, NbRequestPasswordComponent } from '@nebular/auth';

@Component({
    selector: 'nb-request-password-page',
    styleUrls: ['./request-password.component.scss'],
    templateUrl: './request-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {
    ngOnInit() {
    }

    requestPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.requestPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
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