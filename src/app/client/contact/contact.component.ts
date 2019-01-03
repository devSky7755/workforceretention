import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    email = {name: '', from_email: '', subject: '', message: ''};

    constructor() {
    }

    ngOnInit() {
    }

}
