import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../@core/data/employee.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

    employeeForm: FormGroup;
    errorMessage;
    employee = {email: '', password: '', remember_me: false};

    constructor(private employeeService: EmployeeService, private router: Router) {
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
        const credential = {email: this.employee.email, password: this.employee.password};
        this.employeeService.loginEmployee(credential).subscribe(
            data => {
                // data will contain refreshToken, token and employee_id
                // after getting the data we need to save the data in the localStorage
                // also set the remember me.
                // so if the remember is checked. then every time the user change route then refresh token
                // then we need to redirect to the employee details page
                //
                data.remember_me = this.employee.remember_me;
                localStorage.setItem('employee', JSON.stringify(data));
                this.employeeService.employee = data;
                this.employeeService.authChange.next(true);
                this.router.navigateByUrl('/client/dashboard');
            },
            err => {
                const {error} = err;
                this.errorMessage = error.message;
                this.employeeForm.reset();
            }
        );

    }
}
