import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'ngx-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

    employeeForm: FormGroup;
    employee = {email: '', password: ''};

    constructor() {
    }

    // use reactive form approach for handling form
    ngOnInit() {
        this.createForm();
    }

    // validator function
    get(controlName) {
        return this.employeeForm.get(controlName);
    }

    createForm() {
        this.employeeForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")
            ]),
            password: new FormControl('', [Validators.required])
        });
    }

    login() {
    }
}
