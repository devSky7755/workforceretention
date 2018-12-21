import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SurveyService} from "../../../@core/data/survey.service";

@Component({
    selector: 'ngx-survey-management',
    templateUrl: './survey-management.component.html',
    styleUrls: ['./survey-management.component.scss'],
})
export class SurveyManagementComponent implements OnInit {
    rows = [];
    count = 0;
    offset = 0;
    limit = 9;
    surveys;

    constructor(private router: Router, private surveyService: SurveyService) {
    }

    onClickAdd() {
        this.router.navigateByUrl('/pages/surveys/survey-management/add');
    }

    ngOnInit() {
        this.page(this.offset, this.limit);
    }

    /**
     * Populate the table with new data based on the staticPage number
     * @param staticPage The staticPage to select
     */
    onPage(event) {
        this.page(event.offset, event.limit);
    }

    onClickEdit(id) {
        this.router.navigateByUrl('/pages/surveys/survey-management/edit/' + id);
    }

    onClickDelete(id) {
        //find the employee name from the rows using
        const name = this.rows.find(x => x.id === id).title;
        if (confirm("Are you sure to delete " + name)) {
            this.deleteSurvey(id);
        }
    }

    deleteSurvey(id) {
        this.surveyService.deleteSurvey(id).subscribe(
            data => {
                console.log(data);
                this.page(this.offset, this.limit);
            },
            err => {
                console.log(err);
            }
        );
    }

    page(offset, limit) {
        this.surveyService.getSurveys(offset, limit).subscribe(results => {
                this.count = results.totalItems;
                this.surveys = results.surveys;
                const rows = [];
                this.surveys.map((survey) => {
                    // Modify article role
                    survey.id = survey._id;
                    survey.noOfQuestion = survey.no_of_questions;
                    rows.push(survey);
                });
                this.rows = rows;
                console.log(this.rows);

            },
            (err) => {
                console.log(err);
            }
        );
    }

}
