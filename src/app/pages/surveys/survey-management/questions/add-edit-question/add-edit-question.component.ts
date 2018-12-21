import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../../../@core/data/survey.service";

@Component({
    selector: 'ngx-add-edit-question',
    templateUrl: './add-edit-question.component.html',
    styleUrls: ['./add-edit-question.component.scss']
})
export class AddEditQuestionComponent implements OnInit {

    myForm: FormGroup;
    surveyId;
    survey;
    survey_types = [
        {id: 1, value: 'RECAP'},
        {id: 2, value: 'Exit Interview'}
    ];
    question_types = [
        {id: 1, value: 'Rating Radio Buttons'},
        {id: 2, value: 'Free Text'},
        {id: 3, value: 'Exit Interview - Exit Reasons'},
        {id: 4, value: 'Yes / No Radio'},
        {id: 5, value: 'Radio Labels'},
        {id: 6, value: 'Multiple Choice'},
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
    exit_reason = [
        {id: 1, value: 'Career Opportunities'},
        {id: 2, value: 'Meaningful Work'},
        {id: 3, value: 'Communication'},
        {id: 4, value: 'Effective Leadership'},
        {id: 5, value: 'Induction'},
        {id: 6, value: 'Learning & Development'},
        {id: 7, value: 'Manager'},
        {id: 8, value: 'Pay & Benefits'},
        {id: 9, value: 'Work Conditions'},
        {id: 10, value: 'Being Valued'},
        {id: 11, value: 'Initial Question'},
        {id: 12, value: 'Custom Questions'},
        {id: 13, value: 'Final Question'},
        {id: 14, value: 'Operational'},
        {id: 15, value: 'Restructure'},
    ];

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private surveyService: SurveyService) {
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
            email: '',
            phones: this.fb.array([])
        });
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
        for (let i = 1; i <= this.survey.no_of_questions; i++) {
            this.addPhone();
        }


        this.surveyId = data.survey._id;

    }

    get phoneForms() {
        return this.myForm.get('phones') as FormArray;
    }

    saveSurvey() {
        for (let i = 0; i < this.phoneForms.controls.length; i++) {
            // this.phoneForms.controls[i].setValue({area: 'I am Ashik Mahmud', prefix: '1', line: 'This is line'});
        }
    }

    addPhone() {

        const phone = this.fb.group({
            area: [],
            prefix: [],
            line: [],
            exit_reason: []
        });
        this.phoneForms.push(phone);
    }

    deletePhone(i) {
        this.phoneForms.removeAt(i);
    }

}
