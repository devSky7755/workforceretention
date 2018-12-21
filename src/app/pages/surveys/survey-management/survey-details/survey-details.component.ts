import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../../../@core/data/survey.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'ngx-survey-details',
    templateUrl: './survey-details.component.html',
    styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

    surveyId;
    survey;
    myForm: FormGroup;
    survey_types = [
        {id: 1, value: 'RECAP'},
        {id: 2, value: 'Exit Interview'}
    ];
    ratings = [
        {id: 2, value: '1-2'},
        {id: 3, value: '1-3'},
        {id: 4, value: '1-4'},
        {id: 5, value: '1-5'},
        {id: 6, value: '1-6'},
        {id: 7, value: '1-7'},
        {id: 8, value: '1-8'},
        {id: 9, value: '1-9'},
        {id: 10, value: '1-10'}
    ];

    constructor(private route: ActivatedRoute,
                private surveyService: SurveyService,
                private fb: FormBuilder,
                private router: Router) {
        this.survey = {};
    }

    ngOnInit() {
        //  here get the id of the survey
        this.surveyId = this.route.snapshot.paramMap.get('id');
        if (this.surveyId) {
            //get the employee from the database and set to the employee
            this.getSurvey();
        }
        this.myForm = this.fb.group({
            rating_labels: this.fb.array([])
        });
    }

    getRatingLabels() {
        return this.myForm.get('rating_labels') as FormArray;
    }

    saveSurvey() {
        this.router.navigateByUrl('/pages/surveys/survey-management/question/add/' + this.surveyId);
    }

    addLabel() {

        const rating_label = this.fb.group({
            label: []
        });
        this.getRatingLabels().push(rating_label);
    }

    getSurvey() {
        this.surveyService.getSurvey(this.surveyId).subscribe(data => {
                this.setPage(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    setPage(data) {
        console.log(data);
        this.survey.title = data.survey.title;
        this.survey.description = data.survey.description;
        this.survey.instruction = data.survey.instruction;
        this.survey.no_of_questions = data.survey.no_of_questions;
        this.survey.survey_type = data.survey.survey_type;
        this.survey.rating_scale = data.survey.rating_scale;
        // Finally set the Id of the Page
        // Depending on the rating_scale generate text-box
        this.survey.type_label = this.survey_types.find(s => s.id == this.survey.survey_type).value;
        this.survey.rating_label = this.ratings.find(r => r.id == this.survey.rating_scale).value;
        for (let i = 1; i <= this.survey.rating_scale; i++) {
            this.addLabel();
        }


        this.surveyId = data.survey._id;

    }


}
