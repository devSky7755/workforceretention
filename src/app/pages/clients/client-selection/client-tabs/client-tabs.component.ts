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

    //IS ADD EDIT Variable is used to display the Form for editing
    isAddDivision = false;
    isAddDepartment = false;
    isAddEmployee = false;
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
        this.selectTab();
    }
    selectDepartment() {
        this.isShowOrganization = true;
        this.isShowDivision = false;
        this.isShowDepartment = false;
        this.selectTab();
    }

    selectTab() {
        this.isAddEmployee = false;
        this.isAddOrganization = false;
        this.isEditEmail = false;
        this.isAddDivision = false;
        this.isAddDepartment = false;
    }

    onClickAddEmployee() {
        this.isAddEmployee = true;
    }

    onClickAddDivision(event) {
        console.log(event);
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
        console.log(event);
        this.organizationId = event.organizationId;
        this.isShowDivision = true;
        this.isAddDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
        this.isShowDepartment = false;
        this.isAddDepartment = false;
    }

    onClickAddDepartment(event) {
        console.log(event);
        this.divisionId = event.divisionId;
        this.isShowDepartment = false;
        this.isAddDepartment = true;
        this.isShowDivision = false;
        this.isAddDivision = false;
        this.isShowOrganization = false;
        this.isAddOrganization = false;
    }

    onClickViewDepartment(event) {
        console.log(event);
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

    editEmployee(event) {
        this.employeeId = event.employeeId;
        this.isAddEmployee = true;
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
