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
    response_array = [];
    leaving_reason_rearranged_array = [];
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

    single = [];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    schemaType = 'ordinal';
    showDataLabel = false;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Percentage Distribution ( % )';

    // colorScheme = {
    //     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // };
    colorScheme = 'night';

    onSelect(event) {
        console.log(event);
    }

    top_reason_for_leaving_chart_data = [];
    career_opportunities_chart_data = [];
    meaningful_work_chart_data = [];
    communication_chart_data = [];
    effective_leadership_chart_data = [];
    induction_chart_data = [];
    learning_development_chart_data = [];
    manager_chart_data = [];
    pay_benefits_chart_data = [];
    work_conditions_chart_data = [];
    being_valued_chart_data = [];
    operational_chart_data = [];
    restructure_chart_data = [];

    gender_split_chart_data = [];
    tenure_split_chart_data = [];
    age_split_chart_data = [];

    employee_sentiment_working_chart_data = [];
    employee_sentiment_not_working_chart_data = [];

    constructor(private reportService: ReportService) {
    }

    ngOnInit() {
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            this.employee = JSON.parse(localStorage.getItem('employee'));
        }
        this.getManagerReport();
        this.getManagerDetails();
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

//     [
//         {
//             "name": "Germany",
//             "series": [
//                 {
//                     "name": "2010",
//                     "value": 40632
//                 },
//                 {
//                     "name": "2000",
//                     "value": 36953
//                 },
//                 {
//                     "name": "1990",
//                     "value": 31476
//                 }
//             ]
//         },
// {
//     "name": "United States",
//     "series": [
//         {
//             "name": "2010",
//             "value": 49737
//         },
//         {
//             "name": "2000",
//             "value": 45986
//         },
//         {
//             "name": "1990",
//             "value": 37060
//         }
//         ]
// },
// {
//     "name": "France",
//     "series": [
//     {
//         "name": "2010",
//         "value": 36745
//     },
//     {
//         "name": "2000",
//         "value": 34774
//     },
//     {
//         "name": "1990",
//         "value": 29476
//     }
// ]
// },
// {
//     "name": "United Kingdom",
//     "series": [
//     {
//         "name": "2010",
//         "value": 36240
//     },
//     {
//         "name": "2000",
//         "value": 32543
//     },
//     {
//         "name": "1990",
//         "value": 26424
//     }
// ]
// }
// ]

    showChartReport(data) {
        // first get the final question
        // find the top 3 reasons for leaving the exit interview from the final question
        this.response_array = data.response_array;
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
        this.leaving_reason_rearranged_array = final_question.options;
        // now we can take the first three items and insert it into the top_leaving_reasons array
        if (final_question.options.length > 3) {
            // this means there are more than 3 items so we can take the first 3 items
            this.top_leaving_reasons.push(final_question.options[0], final_question.options[1], final_question.options[2]);
        }
        final_question.options.map((option) => {
            const result = {name: this.exit_reasons[option.label_index].value, value: option.percentage};
            this.top_reason_for_leaving_chart_data.push(result);
        });

        // foreach answer in the response_array find out the percentage
        this.response_array.map((answer) => {
            if (answer.exit_reason !== '13') {
                // we already find out the percentage for final question. so we don't need to do this again
                total_points = 0;
                answer.options.map((option) => {
                    total_points += option.answered;
                });
                // now calculate the percentage for each option
                answer.options.map((option) => {
                    option.percentage = (option.answered / total_points) * 100;
                });
            }
        });
        console.log(this.response_array);

        // Now loop through the final question options and find out exit reason by the label_index
        // after finding the exit reason find out all the answers by the exit reason
        // for example exit reason is 3 (communication). so find out all the answers which exit_reason is 3
        // finally rearrange the data like as the above structure
        final_question.options.map((option) => {
            // option.label_index this will not work;
            // filter the reason by the exit_reason.id
            if (option.label_index === 0) {
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '1');
                // Career Opportunities
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.career_opportunities_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 1) {
                // Meaningful Work
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '2');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.meaningful_work_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 2) {
                // Communication
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '3');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.communication_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 3) {
                // Effective Leadership
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '4');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.effective_leadership_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 4) {
                // Induction
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '5');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.induction_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 5) {
                // Learning & Development
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '6');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.learning_development_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 6) {
                // Manager
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '7');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.manager_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 7) {
                // Pay & Benefits
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '8');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.pay_benefits_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 8) {
                // Work Conditions
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '9');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.work_conditions_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 9) {
                // Being Valued
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '10');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.being_valued_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 10) {
                // Operational
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '14');
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.operational_chart_data.push(rearrange_answer);
                });
            } else if (option.label_index === 11) {
                // Restructure
                const filtered_reason = this.response_array.filter(x => x.exit_reason === '15');
                // Career Opportunities
                filtered_reason.map((reason) => {
                    // name
                    // series
                    const series = [];
                    reason.options.map((r) => {
                        series.push({name: r.label, value: r.percentage});
                    });
                    const rearrange_answer = {name: reason.exit_reporting_label, series: series};
                    this.restructure_chart_data.push(rearrange_answer);
                });
            }
            // now check the exit_reason in which category. depending on the category push data to the array
            // for example exit_reason is Career Opportunities so we need to push data to the career_opportunities_chart_data array
        });
        console.log(this.induction_chart_data);
        this.single = this.top_reason_for_leaving_chart_data;
    }

}
