import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../@core/data/report.service";

@Component({
    selector: 'ngx-manager-report',
    templateUrl: './manager-report.component.html',
    styleUrls: ['./manager-report.component.scss']
})
export class ManagerReportComponent implements OnInit {

    filterData = {start_date: null, end_date: null, level: "", occupational_group: "", gender: "", tenure: ""};
    genders = [{id: "Male", value: "Male"}, {id: "Female", value: "Female"}];
    employee;
    organization;
    organizations_divisions_departments = [];
    top_leaving_reasons = [];
    exit_reasons = [
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
    tenures = [
        {id: 1, value: "< 1 year"},
        {id: 2, value: "1 - 2 years"},
        {id: 3, value: "3 - 5 years"},
        {id: 4, value: "6 - 10 years"},
        {id: 5, value: "> 10 years"},
    ];
    occupations = [
        {id: 1, value: 'Not Classified'},
        {id: 2, value: 'Managers'},
        {id: 3, value: 'Professionals'},
        {id: 4, value: 'Technicians and Trade Workers'},
        {id: 5, value: 'Community and Personal Service Workers'},
        {id: 6, value: 'Clerical and Administrative Workers'},
        {id: 7, value: 'Sales Workers'},
        {id: 8, value: 'Machinery Operators and Drivers'},
        {id: 9, value: 'Labourers'},
    ];

    // First Question Chart
    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Number';
    showYAxisLabel = true;
    yAxisLabel = 'Color Value';
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    top_reason_for_leaving_chart_data = [];

    constructor(private reportService: ReportService) {
    }

    ngOnInit() {
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            this.employee = JSON.parse(localStorage.getItem('employee'));
        }
        this.getManagerDetails();
        this.getManagerReport();
    }

    getManagerDetails() {
        this.reportService.getReportDetails(this.employee.employee_id).subscribe(
            res => {
                this.organization = res.organization;
                this.arrangeOrganization();
            }
        );
    }

    getManagerReport() {
        this.reportService.getReport(this.employee.employee_id, this.filterData).subscribe(
            res => {
                console.log(res);
                this.showChartReport(res);
            }
        );
    }

    arrangeOrganization() {
        const organization = {
            id: this.organization._id,
            class: 'organization',
            name: this.organization.name
        };
        this.organizations_divisions_departments.push(organization);
        if (!this.NotNullOrEmpty(this.organization.divisions)) {
            this.organization.divisions.map((division) => {
                const newDivision = {
                    id: this.organization._id + '_' + division._id,
                    name: '\u00A0 --' + division.name,
                    class: 'division'
                };
                this.organizations_divisions_departments.push(newDivision);
                if (!this.NotNullOrEmpty(division.departments)) {
                    division.departments.map((department) => {
                        const newDepartment = {
                            id: this.organization._id + '_' + division._id + '_' + department._id,
                            class: 'department',
                            name: '\u00A0 \u00A0 ---' + department.name
                        };
                        this.organizations_divisions_departments.push(newDepartment);
                    });
                }
            });
        }
    }

    NotNullOrEmpty(obj) {
        return typeof obj === 'undefined' || obj == null;
    }

    viewReport() {
        this.getManagerReport();
    }

    // *************** RULES ***************
    // first find the top 3 reasons for leaving the exit interview
    // calculation
    // Reason                1st choice     2nd choice   total points     percentage
    // Career Opportunities    10               2            12
    // Pay & Benefits          8                2            10
    // Work Conditions         4                5            9
    // Operational             2                2            4
    // Learning & Development  2                2            4
    // Manager                 2                1            3
    // Meaningful Work         2                0            2
    // Effective Leadership    0                1            1

    // Percentage Calculation
    // total points = 45
    // Career Opportunities Percentage = (12 /45) * 100 = 26.66 %

    // for all Question under Career Opportunities for each question there will be a bar in the chart
    // For example there are 4 questions in the Career Opportunities Category So there will be 4 bar in the chart
    // Now calculate how many people Agree, Neutral and Disagree (Need to calculate percentage as well)
    // Agree and Strongly Agree --------------------- 11
    // Disagree and Strongly Disagree --------------- 4
    // Neutral -------------------------------------- 0

    // Percentage of Agree and Strongly Agree ------ (11 / 15) * 100 = 73.33 %
    // Percentage of Disagree and Strongly Disagree -(4/15) * 100 = 26.66 %
    // Percentage of Neutral ------------------------(0/15) * 100 = 0 %


    // response will be something like this
    // top_reasons (Array of objects) {label: Career Opportunities, percentage: 26.66 }
    // answers (Array of objects) {question_id : 1, category_label: Career Opportunities, answers : [{label:Agree and Strongly Agree, percentage: 73.33}]}

    // re-arrange the answers by the category label (highest leaving reason)

    showChartReport(data) {
        // first get the final question
        // find the top 3 reasons for leaving the exit interview from the final question
        const final_question = data.response_array.find(ex => ex.exit_reason === '13');
        // Percentage Calculation
        // total points = 45
        // Career Opportunities Percentage = (12 /45) * 100 = 26.66 %
        let total_points = 0;
        final_question.options.map((option) => {
            total_points += option.answered;
        });
        // now calculate the percentage for each option
        final_question.options.map((option) => {
            option.percentage = (option.answered / total_points) * 100;
        });
        // now we need to re-arrange options by percentage in the descending order
        final_question.options.sort((a, b) => (a.percentage < b.percentage) ? 1 : -1);
        // now we can take the first three items and insert it into the top_leaving_reasons array
        if (final_question.options.length > 3) {
            // this means there are more than 3 items so we can take the first 3 items
            this.top_leaving_reasons.push(final_question.options[0], final_question.options[1], final_question.options[2]);
        }
        final_question.options.map((option) => {
            const result = {name: this.exit_reasons[option.label_index].value, value: option.percentage};
            this.top_reason_for_leaving_chart_data.push(result);
        });
        console.log(this.top_reason_for_leaving_chart_data);
    }

}
