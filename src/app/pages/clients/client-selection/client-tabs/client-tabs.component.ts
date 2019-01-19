import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'ngx-client-tabs',
    templateUrl: './client-tabs.component.html',
    styleUrls: ['./client-tabs.component.scss']
})
export class ClientTabsComponent implements OnInit {

    clientId;
    emailId;
    organizationId;
    employeeId;
    divisionId;
    departmentId;
    surveyCompleted;
    surveyId;

    //IS ADD EDIT Variable is used to display the Form for editing
    isAddDivision = false;
    isAddDepartment = false;
    isAddEmployee = false;
    isShowEmployeeTable = false;
    showEmployeeDetails = false;
    isShowEmployeeSurvey = false;
    isAddOrganization = false;
    isEditEmail = false;

    //SHOW Variable for displaying multiple component in a single tab
    isShowOrganization = true;
    isShowDivision = false;
    isShowDepartment = false;

    constructor(private route: ActivatedRoute) {
    }

    onTabChange($event) {
        switch ($event.tabTitle) {
            case 'Employees':
                this.isShowEmployeeTable = true;
                this.selectTab();
                break;
            case 'Organizations':
                this.organizationId = null;
                this.divisionId = null;
                this.departmentId = null;
                this.isShowOrganization = true;
                this.isShowDivision = false;
                this.isShowDepartment = false;
                this.selectTab();
                break;
            case 'Client Details':
                this.selectTab();
                break;
            case 'Emails':
                this.selectTab();
                break;
        }
    }

    selectOrganization() {
        this.isShowOrganization = true;
        this.isShowDivision = false;
        this.isShowDepartment = false;
        this.selectTab();
    }

    selectDivision() {
        this.isShowOrganization = true;
        this.isShowDivision = false;
        this.isShowDepartment = false;
        this.organizationId = null;
        this.departmentId = null;
        this.divisionId = null;
        this.selectTab();
    }

    selectDepartment() {
        this.isShowOrganization = true;
        this.isShowDivision = false;
        this.isShowDepartment = false;
        this.organizationId = null;
        this.departmentId = null;
        this.divisionId = null;
        this.selectTab();
    }

    selectTab() {
        this.isShowEmployeeSurvey = false;
        this.isAddEmployee = false;
        this.showEmployeeDetails = false;
        this.isAddOrganization = false;
        this.isEditEmail = false;
        this.isAddDivision = false;
        this.isAddDepartment = false;
    }

    onClickAddEmployee() {
        this.isAddEmployee = true;
    }

    onClickAddDivision(event) {
        this.organizationId = event.organizationId;
        this.isAddDivision = true;
        this.isShowDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
    }

    addDivisionButtonClicked() {
        this.onClickAddDivision({organizationId: this.organizationId});
    }

    addDepartmentButtonClicked() {
        this.onClickAddDepartment({divisionId: this.divisionId});
    }

    onClickViewDivision(event) {
        this.organizationId = event.organizationId;
        this.isShowDivision = true;
        this.isAddDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
    }

    onClickAddDepartment(event) {
        this.divisionId = event.divisionId;
        this.isShowDepartment = false;
        this.isAddDepartment = true;
        this.isShowDivision = false;
        this.isAddDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
    }

    onClickViewDepartment(event) {
        this.divisionId = event.divisionId;
        this.isShowDepartment = true;
        this.isAddDepartment = false;
        this.isShowDivision = false;
        this.isAddDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
    }

    onClickAddOrganization() {
        this.organizationId = null;
        this.isAddOrganization = true;
        this.isShowOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
        this.isShowDivision = false;
        this.isAddDivision = false;
    }

    onClickEmployeeDetails(event) {
        this.employeeId = event.employeeId;
        this.showEmployeeDetails = true;
        this.isShowEmployeeSurvey = false;
        this.isAddEmployee = false;
        this.isShowEmployeeTable = false;
    }

    editSurvey(event) {
        console.log(event);
        this.surveyId = event.surveyId;
        this.surveyCompleted = event.surveyCompleted;
        this.isAddEmployee = false;
        this.isShowEmployeeSurvey = true;
        this.isShowEmployeeTable = false;
        this.showEmployeeDetails = false;
    }

    editEmployee(event) {
        this.employeeId = event.employeeId;
        this.isAddEmployee = true;
        this.isShowEmployeeSurvey = false;
        this.isShowEmployeeTable = false;
        this.showEmployeeDetails = false;
    }

    editEmail(event) {
        this.emailId = event.emailId;
        this.isEditEmail = true;
    }

    editOrganization(event) {
        this.organizationId = event.organizationId;
        this.isAddOrganization = true;
        this.isShowOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
        this.isShowDivision = false;
        this.isAddDivision = false;
    }

    editDivision(event) {
        this.divisionId = event.divisionId;
        this.isAddOrganization = false;
        this.isShowOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
        this.isShowDivision = false;
        this.isAddDivision = true;
    }

    editDepartment(event) {
        this.departmentId = event.departmentId;
        this.isAddOrganization = false;
        this.isShowOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = true;
        this.isShowDivision = false;
        this.isAddDivision = false;
    }

    ngOnInit() {
        this.clientId = this.route.snapshot.paramMap.get('id');
    }

}
