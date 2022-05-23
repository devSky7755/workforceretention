import { Component, OnInit } from '@angular/core';
import { NbAuthResult, NbLoginComponent } from '@nebular/auth';

@Component({
    selector: 'ngx-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
    ngOnInit() {
    }

    login(): void {
        this.errors = [];
        this.messages = [];
        this.submitted = true;
        this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;
            if (result.isSuccess()) {
                if (result.getResponse().body.tfa) {
                    setTimeout(() => {
                        return this.router.navigateByUrl('/auth/tfa', {
                            state: {
                                phone: result.getResponse().body.phone,
                                token: result.getResponse().body.tfa_token,
                            }
                        });
                    }, this.redirectDelay);
                    return;
                }
                this.messages = result.getMessages();
            } else {
                this.errors = result.getErrors();
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }
}
