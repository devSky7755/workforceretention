import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../@core/data/report.service";

@Component({
    selector: 'ngx-manager-report',
    templateUrl: './manager-report.component.html',
    styleUrls: ['./manager-report.component.scss']
})
export class ManagerReportComponent implements OnInit {

    filterData = {start_date: null, end_date: null, level: "", occupational_group: "", gender: "", tenure: ""};
    genders = [{id: "Male", value: "Male"}, {id: "Female", value: "Female"}];
    employee;
    organization;
    organizations_divisions_departments = [];
    tenures = [
        {id: 1, value: "< 1 year"},
        {id: 2, value: "1 - 2 years"},
        {id: 3, value: "3 - 5 years"},
        {id: 4, value: "6 - 10 years"},
        {id: 5, value: "> 10 years"},
    ];
    occupations = [
        {id: 1, value: 'Not Classified'},
        {id: 2, value: 'Managers'},
        {id: 3, value: 'Professionals'},
        {id: 4, value: 'Technicians and Trade Workers'},
        {id: 5, value: 'Community and Personal Service Workers'},
        {id: 6, value: 'Clerical and Administrative Workers'},
        {id: 7, value: 'Sales Workers'},
        {id: 8, value: 'Machinery Operators and Drivers'},
        {id: 9, value: 'Labourers'},
    ];

    constructor(private reportService: ReportService) {
    }

    ngOnInit() {
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            this.employee = JSON.parse(localStorage.getItem('employee'));
        }
        this.getManagerDetails();
        this.getManagerReport();
    }

    getManagerDetails() {
        this.reportService.getReportDetails(this.employee.employee_id).subscribe(
            res => {
                this.organization = res.organization;
                this.arrangeOrganization();
            }
        );
    }

    getManagerReport() {
        this.reportService.getReport(this.employee.employee_id, this.filterData).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    arrangeOrganization() {
        const organization = {
            id: this.organization._id,
            class: 'organization',
            name: this.organization.name
        };
        this.organizations_divisions_departments.push(organization);
        if (!this.NotNullOrEmpty(this.organization.divisions)) {
            this.organization.divisions.map((division) => {
                const newDivision = {
                    id: this.organization._id + '_' + division._id,
                    name: '\u00A0 --' + division.name,
                    class: 'division'
                };
                this.organizations_divisions_departments.push(newDivision);
                if (!this.NotNullOrEmpty(division.departments)) {
                    division.departments.map((department) => {
                        const newDepartment = {
                            id: this.organization._id + '_' + division._id + '_' + department._id,
                            class: 'department',
                            name: '\u00A0 \u00A0 ---' + department.name
                        };
                        this.organizations_divisions_departments.push(newDepartment);
                    });
                }
            });
        }
    }

    NotNullOrEmpty(obj) {
        return typeof obj === 'undefined' || obj == null;
    }

    viewReport() {
        this.getManagerReport();
    }

}
