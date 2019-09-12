import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../@core/data/employee.service";
import { OrganizationService } from "../../@core/data/organization.service";
import { DivisionService } from "../../@core/data/division.service";
import { DepartmentService } from "../../@core/data/department.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'ngx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    employee;
    employee_details;
    password = { old_password: '', new_password: '', new_password_confirmation: '' };
    passwordForm: FormGroup;
    successMessage


    constructor(private employeeService: EmployeeService,
        private organizationService: OrganizationService,
        private divisionService: DivisionService,
        private departmentService: DepartmentService) {
        this.employee_details = {};
    }

    ngOnInit() {
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            this.employee = JSON.parse(localStorage.getItem('employee'));
            this.createForm()
        }
        this.getEmployeeDetails();
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('newPassword').value;
        let confirmPass = group.get('newPasswordConfirmation').value;

        return pass === confirmPass ? null : { notSame: true }
    }

    createForm() {
        this.passwordForm = new FormGroup({
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            newPasswordConfirmation: new FormControl('')
        }, { validators: this.checkPasswords })
    }

    getEmployeeDetails() {
        this.employeeService.getEmployee(this.employee.employee_id).subscribe(
            res => {
                this.employee_details = res.employee;
                if (this.employee_details.organization) {
                    this.getOrganization(this.employee_details.organization);
                }
            }
        );
    }

    getOrganization(organizationId) {
        this.organizationService.getOrganization(organizationId).subscribe(
            data => {
                this.employee_details.organization = data.organization.name;
                if (this.employee_details.division) {
                    this.getDivision(this.employee_details.division);
                }
            }
        );
    }

    getDivision(divisionId) {
        this.divisionService.getDivision(divisionId).subscribe(
            data => {
                this.employee_details.division = data.division.name;
                if (this.employee_details.department) {
                    this.getDepartment(this.employee_details.department);
                }
            }
        );
    }

    getDepartment(departmentId) {
        this.departmentService.getDepartment(departmentId).subscribe(
            data => {
                this.employee_details.department = data.department.name;
            }
        );
    }

    // validator function
    get(controlName) {
        return this.passwordForm.get(controlName);
    }

    changePassword() {
        const password = {
            old_password: this.get("oldPassword").value,
            new_password: this.get("newPassword").value,
            clientId: this.employee_details.client._id
        };
        this.employeeService.changePassword(password, this.employee_details._id).subscribe(
            data => {
                this.successMessage = data.message;
            },
            err => {
                const { error } = err;
                this.successMessage = ''
                this.passwordForm.setErrors({ 'message': error.message });
            }
        );
    }
}
