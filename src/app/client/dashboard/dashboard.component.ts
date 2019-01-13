import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../@core/data/survey.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    count = 0;
    offset = 0;
    limit = 9;
    completedSurveys = [];

    constructor(private surveyService: SurveyService, private router: Router) {
    }

    ngOnInit() {
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
        this.surveyService.getSurveys(offset, limit).subscribe(results => {
                this.count = results.totalItems;
                const rows = [];
                results.surveys.map((survey) => {
                    // Modify article role
                    survey.id = survey._id;
                    survey.noOfQuestion = survey.no_of_questions;
                    rows.push(survey);
                });
                this.completedSurveys = rows;

            },
            (err) => {
                console.log(err);
            }
        );
    }

    onClickGoSurvey(surveyId) {
        this.router.navigateByUrl('/client/questions/' + surveyId);
    }

}
