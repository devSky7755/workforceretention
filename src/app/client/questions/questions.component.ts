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
    answers = [];
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
    exit_reason_checkbox = [
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
        {id: 11, value: 'Operational'},
        {id: 12, value: 'Restructure'},
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
        this.survey.rating_labels = data.survey.rating_labels;
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

    onSubmitAnswer() {
        // validate answer
        // render answer
        this.categorical_questions.map((cat_question) => {
            // foreach question there will have an answer
            cat_question.questions.map((question) => {
                // first check the question type
                // {id: 1, value: 'Rating Radio Buttons'},
                // {id: 2, value: 'Free Text'},
                // {id: 3, value: 'Exit Interview - Exit Reasons'},
                // {id: 4, value: 'Yes / No Radio'},
                // {id: 5, value: 'Radio Labels'},
                // {id: 6, value: 'Multiple Choice'},
                const options = [];
                if (question.type == this.question_types[0].id) {
                    // Rating Radio Buttons
                    this.survey.rating_labels.map((label, index) => {
                        const rating_radio_input = <HTMLInputElement>document.getElementById(`rating-radio-label-${question.question_no}-${index}`);
                        if (rating_radio_input.checked) {
                            options.push(rating_radio_input.value);
                        }
                    });
                } else if (question.type == this.question_types[1].id) {
                    // Free Text
                    const free_text_input = <HTMLInputElement>document.getElementById(`question-comment-${question.question_no}`);
                    options.push(free_text_input);
                } else if (question.type == this.question_types[2].id) {
                    // Exit Interview - Exit Reasons
                    question.options.map((option, index) => {
                        if (option == 'true') {
                            const simple_radio_input = <HTMLInputElement>document.getElementById(`exit-reason-choice-${question.question_no}-${index}`);
                            // this will store the index of the checked item
                            if (simple_radio_input.checked) options.push(index);
                        }
                    });
                } else if (question.type == this.question_types[3].id) {
                    // Yes / No Radio
                    const yes_radio_label = <HTMLInputElement>document.getElementById(`radio-${question.question_no}-yes`);
                    const no_radio_label = <HTMLInputElement>document.getElementById(`radio-${question.question_no}-no`);
                    if (yes_radio_label.checked) {
                        options.push(yes_radio_label.value);
                    }
                    if (no_radio_label.checked) {
                        options.push(no_radio_label.value);
                    }
                } else if (question.type == this.question_types[4].id) {
                    // Radio Labels
                    question.options.map((option, index) => {
                        const radio_label_input = <HTMLInputElement>document.getElementById(`radio-label-${question.question_no}-${index}`);
                        if (radio_label_input.checked) options.push(index);
                    });
                } else {
                    // Multiple Choice
                    question.options.map((option, index) => {
                        const multiple_choice_input = <HTMLInputElement>document.getElementById(`multiple-choice-${question.question_no}-${index}`);
                        if (multiple_choice_input.checked) options.push(index);
                    });
                }
                const answer = {options: options, question: question._id, question_type: question.type};
                this.answers.push(answer);
            });
        });
        // save the answer to the database
        console.log(this.answers);
    }

    setQuestionAnswer() {
    }
}
