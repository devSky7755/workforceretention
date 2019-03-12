import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyService} from "../../../@core/data/survey.service";
import {ClientService} from "../../../@core/data/client.service";

@Component({
    selector: 'ngx-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnChanges {

    @Input() clientId: string;
    rows = [];
    count = 0;
    offset = 0;
    limit = 10;
    assigned = false;
    surveys;
    clientSurveys = [];
    survey_types = [
        {id: 1, value: 'Exit Interview'}
    ];

    constructor(private surveyService: SurveyService, private clientService: ClientService) {
    }

    ngOnInit() {
    }

    onPage(event) {
        this.page(event.offset, event.limit);
    }

    getClientSurveys() {
        this.clientService.getClient(this.clientId).subscribe(
            data => {
                this.clientSurveys = data.client.surveys;
                this.page(this.offset, this.limit);
            }
        );
    }

    assignSurvey(surveyId) {
        this.clientService.assignSurvey(this.clientId, surveyId).subscribe(
            data => {
                this.clientSurveys = data.client.surveys;
                this.page(this.offset, this.limit);
            }
        );
    }

    unAssignSurvey(surveyId) {
        this.clientService.unAssignSurvey(this.clientId, surveyId).subscribe(
            data => {
                this.clientSurveys = data.client.surveys;
                this.page(this.offset, this.limit);
                console.log(data);
            }
        );
    }

    onClickAssign(surveyId, assigned) {
        if (assigned) {
            // check if this client employees is completed any survey or not
            // if any client employees has completed survey that means it's not possible to unAssign the survey
            // before unAssignSurvey survey get the client employees
            // foreach employee check if the employee completed the survey or not
            // if any employee completed the survey then break that loop
            // then disallow to unAssignSurvey and show an alert message that Employee under client_name already completed the survey
            // you are not to allowed to unAssign Survey
            this.unAssignSurvey(surveyId);
        } else {
            this.assignSurvey(surveyId);
        }
    }

    page(offset, limit) {
        this.surveyService.getSurveys(offset, limit).subscribe(data => {
                this.count = data.totalItems;
                this.surveys = data.surveys;
                const rows = [];
                this.surveys.map((survey) => {
                    // Modify staticPage role
                    survey.id = survey._id;
                    //first check if clientSurveys array is null or not.
                    const survey_type = this.survey_types.find(s => s.id == survey.survey_type);
                    survey.type = typeof survey_type !== 'undefined' ? survey_type.value : '';
                    if (this.clientSurveys !== null) {
                        const assigned = this.clientSurveys.find(cs => cs === survey._id);
                        survey.assigned = assigned ? true : false;
                    } else {
                        survey.assigned = false;
                    }
                    //here find the clientSurveys array
                    rows.push(survey);
                });
                this.rows = rows;
                for (let i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].assigned) {
                        this.assigned = true;
                        break;
                    }
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        this.clientId = changes.clientId.currentValue;
        this.getClientSurveys();
    }

}
