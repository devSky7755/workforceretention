import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../@core/data/survey.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../@core/data/employee.service";

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    count = 0;
    offset = 0;
    limit = 9;
    employee;
    completedSurveys = [];

    constructor(private surveyService: SurveyService,
                private router: Router,
                private employeeService: EmployeeService) {
    }

    ngOnInit() {
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            this.employee = JSON.parse(localStorage.getItem('employee'));
        }
        this.setCompletedSurveys(this.offset, this.limit);
    }

    /**
     * Populate the table with new data based on the staticPage number
     * @param staticPage The staticPage to select
     */
    onChangeCompletedSurveys(event) {
        this.setCompletedSurveys(event.offset, event.limit);
    }

    setCompletedSurveys(offset, limit) {
        // this.surveyService.getSurveys(offset, limit).subscribe(results => {
        //         this.count = results.totalItems;
        //         const rows = [];
        //         results.surveys.map((survey) => {
        //             // Modify article role
        //             survey.id = survey._id;
        //             survey.noOfQuestion = survey.no_of_questions;
        //             rows.push(survey);
        //         });
        //         this.completedSurveys = rows;
        //
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
        this.employeeService.getEmployeeSurveys(this.employee.employee_id).subscribe(
            data => {
                this.count = data.surveys.length;
                const rows = [];
                data.surveys.map((employeeSurvey) => {
                    // Modify article role
                    employeeSurvey.id = employeeSurvey.survey._id;
                    employeeSurvey.description = employeeSurvey.survey.description;
                    employeeSurvey.title = employeeSurvey.survey.title;
                    employeeSurvey.noOfQuestion = employeeSurvey.survey.no_of_questions;
                    rows.push(employeeSurvey);
                });
                this.completedSurveys = rows;
                console.log(rows);
            }
        );
    }

    onClickGoSurvey(surveyId, completed) {
        this.employeeService.surveyCompleted = completed;
        this.router.navigate(['/client/questions/' + surveyId], {queryParams: {completed: completed}});
    }

}
