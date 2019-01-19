import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeService} from "../../../../@core/data/employee.service";
import {OrganizationService} from "../../../../@core/data/organization.service";
import {DivisionService} from "../../../../@core/data/division.service";
import {DepartmentService} from "../../../../@core/data/department.service";

@Component({
    selector: 'ngx-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, OnChanges {

    @Input() employeeId: string;
    @Input() clientId: string;
    @Output() editSurvey = new EventEmitter();
    employee;
    surveyId;
    surveyCompleted = false;

    constructor(private employeeService: EmployeeService,
                private organizationService: OrganizationService,
                private divisionService: DivisionService,
                private departmentService: DepartmentService) {
        this.employee = {};
    }

    ngOnInit() {
    }

    onEditSurvey() {
        this.editSurvey.emit({
            surveyId: this.surveyId,
            surveyCompleted: this.surveyCompleted,
            employeeId: this.employeeId
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.clientId = changes.clientId.currentValue;
        this.employeeId = changes.employeeId.currentValue;
        if (typeof this.employeeId !== 'undefined' && this.employeeId !== null) {
            this.getEmployee();
        }
    }

    getOrganization(organizationId) {
        this.organizationService.getOrganization(organizationId).subscribe(
            data => {
                this.employee.organization = data.organization.name;
                if (this.employee.division) {
                    this.getDivision(this.employee.division);
                }
            }
        );
    }

    getDivision(divisionId) {
        this.divisionService.getDivision(divisionId).subscribe(
            data => {
                this.employee.division = data.division.name;
                if (this.employee.department) {
                    this.getDepartment(this.employee.department);
                }
            }
        );
    }

    getDepartment(departmentId) {
        this.departmentService.getDepartment(departmentId).subscribe(
            data => {
                this.employee.department = data.department.name;
            }
        );
    }

    getEmployee() {
        this.employeeService.getEmployee(this.employeeId).subscribe(data => {
                //set the employee
                this.employee = data.employee;
                if (this.employee.surveys.length > 0) {
                    this.surveyId = this.employee.surveys[0].survey;
                    this.surveyCompleted = this.employee.surveys[0].completed;
                }
                if (this.employee.organization) {
                    this.getOrganization(this.employee.organization);
                }
            },
            err => {
                console.log(err);
            }
        );
    }

}
