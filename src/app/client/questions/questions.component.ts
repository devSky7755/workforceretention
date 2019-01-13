import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../@core/data/survey.service";

@Component({
    selector: 'ngx-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    surveyId;
    questions = [];
    categorical_questions = [];
    survey;
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
    question_types = [
        {id: 1, value: 'Rating Radio Buttons'},
        {id: 2, value: 'Free Text'},
        {id: 3, value: 'Exit Interview - Exit Reasons'},
        {id: 4, value: 'Yes / No Radio'},
        {id: 5, value: 'Radio Labels'},
        {id: 6, value: 'Multiple Choice'},
    ];
    exit_reason = [
        {id: 11, value: 'Initial Question'},
        {id: 1, value: 'Career Opportunities'},
        {id: 10, value: 'Being Valued'},
        {id: 15, value: 'Restructure'},
        {id: 3, value: 'Communication'},
        {id: 5, value: 'Induction'},
        {id: 4, value: 'Effective Leadership'},
        {id: 6, value: 'Learning & Development'},
        {id: 7, value: 'Manager'},
        {id: 2, value: 'Meaningful Work'},
        {id: 14, value: 'Operational'},
        {id: 8, value: 'Pay & Benefits'},
        {id: 9, value: 'Work Conditions'},
        {id: 13, value: 'Final Question'},
        {id: 12, value: 'Custom Questions'}
    ];
    // we need to rearrange questions by exit_reason
    // after rearrange we need to display questions step by step
    // another way we can display all the questions together
    // question type rating_radio buttons that means that it will display radio buttons
    // question type multiple type that means it will show checkbox
    // question type free-text that means it show textarea
    // question type yes_no radio buttons that means it will show two radio buttons
    // question type exit_interview exit_reason that means it will show the selected checkbox
    constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
        this.survey = {};
    }

    ngOnInit() {
        this.surveyId = this.route.snapshot.paramMap.get('id');
        this.getSurvey();
    }

    getSurvey() {
        this.surveyService.getSurveyQuestions(this.surveyId).subscribe(
            data => {
                this.setPage(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    setPage(data) {
        this.survey.title = data.survey.title;
        this.survey.description = data.survey.description;
        this.survey.instruction = data.survey.instruction;
        this.survey.no_of_questions = data.survey.no_of_questions;
        this.survey.survey_type = data.survey.survey_type;
        this.survey.rating_scale = data.survey.rating_scale;
        this.questions = data.survey.questions;
        // Depending on the rating_scale generate text-box
        this.survey.type_label = this.survey_types.find(s => s.id == this.survey.survey_type).value;
        this.survey.rating_label = this.ratings.find(r => r.id == this.survey.rating_scale).value;
        this.questionArrange();
    }

    questionArrange() {
        let question_no = 1;
        this.exit_reason.map((reason) => {
            //now we need to loop through questions
            const categorical_questions = [];
            this.questions.map((question) => {
                // here compare the reason with the question reason
                if (reason.id == question.exit_reason) {
                    question.question_no = question_no;
                    categorical_questions.push(question);
                    question_no++;
                }
                // if both same then push the question into the categorical_questions array
            });
            this.categorical_questions.push({exit_reason: reason.value, questions: categorical_questions});
        });
    }
}
