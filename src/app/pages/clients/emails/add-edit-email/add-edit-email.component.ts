import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmailService} from "../../../../@core/data/email.service";

@Component({
    selector: 'ngx-add-edit-email',
    templateUrl: './add-edit-email.component.html',
    styleUrls: ['./add-edit-email.component.scss']
})
export class AddEditEmailComponent implements OnInit, OnChanges {
    @Input() emailId;
    successMessage;
    errorMessage;
    email;

    constructor(private route: ActivatedRoute, private emailService: EmailService) {
        this.email = {fromAddress: '', subject: '', body: ''};
    }

    ngOnInit() {
    }

    getEmail() {
        this.emailService.getEmail(this.emailId).subscribe(
            data => {
                console.log(data);
                this.setResult(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    createEmail() {
        const email = {
            fromAddress: this.email.fromAddress,
            subject: this.email.subject,
            body: this.email.body
        };
        if (this.emailId) {
            //perform update operation
            this.update(email);
        }
    }

    update(email) {
        this.emailService.updateEmail(email, this.emailId).subscribe(
            data => {
                this.errorMessage = null;
                this.successMessage = data.message;
                this.setResult(data);
            },
            err => {
                const {error} = err;
                this.errorMessage = error.message;
                console.log(err);
            }
        );
    }

    setResult(data) {
        this.email = data.email;
        this.email.fromAddress = this.email.from_address;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.emailId = changes.emailId.currentValue;
        if (typeof this.emailId !== 'undefined' && this.emailId !== null) {
            this.getEmail();
        }
    }

}
