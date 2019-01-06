import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
    questions = [];
    no_of_labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                private surveyService: SurveyService,
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

    // when selection question type is Ratings Radio Buttons, Free Text, Yes No Radio Button then nothing will happen
    //
    // When selecting question type is Exit Interview - Exit Reasons Then Checkbox Option will generate
    // Options [Career Opportunities, Meaningful Work,Communication, Effective Leadership, Induction, Learning & Development]
    // Options [Manager, Pay & Benefits, Work Conditions, Being Valued, Operational, Restructure]
    //
    // When Selecting Radio Labels Then generate a dropdown field with label 1-10
    // If the number of labels selected is 3 then Generate Three input field
    //
    // When Selecting Multiple Choice Then generate a dropdown field with label 1-10
    // If the number of labels selected is 3 then Generate Three input field
    //
    // Depending on question selection. hide or display
    // Depending on question type here generate the input field
    // There are some static field. put in here

    // ************Tricks to Solve The Above Problem**************
    // create a div and add an id exit-reason-i here i is dynamic value also give a class called hide. which initially hides the div
    // inside div create the input checkbox with the appropriate label

    // create another div and add id radio-label-i here i is also dynamic value also give a class call hide
    // create the select input with value from 0 to 10 add a change event. so when the value change from 0 to 1 for example then generate 1 text-box

    // create another div and add id multiple-choice-i here i is also dynamic value also give a class call hide
    // create the select input with value from 0 to 10 add a change event. so when the value change from 0 to 1 for example then generate 1 text-box
    get phoneForms() {
        return this.myForm.get('phones') as FormArray;
    }

    saveSurvey() {
        for (let i = 0; i < this.phoneForms.controls.length; i++) {
            // title
            // number_of_options
            // type
            // options
            this.phoneForms.controls[i].setValue({area: 'I am Ashik Mahmud', prefix: '1', line: 'This is line'});
            // save the survey
            // after survey successfully saved go to the survey list page
            this.router.navigateByUrl('/pages/surveys/survey-management');
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
