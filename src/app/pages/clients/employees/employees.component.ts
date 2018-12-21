import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmployeeService} from "../../../@core/data/employee.service";

@Component({
    selector: 'ngx-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnChanges {

    @Input() clientId: string;
    @Output() employeeEdit = new EventEmitter();
    rows = [];
    count = 0;
    offset = 0;
    limit = 9;
    successMessage;
    errorMessage;
    employees = [];

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
    }

    /**
     * Populate the table with new data based on the staticPage number
     * @param staticPage The staticPage to select
     */
    onPage(event) {
        this.page(event.offset, event.limit);
    }

    onClickEdit(employeeId) {
        this.employeeEdit.emit({employeeId});
    }

    onClickDelete(employeeId) {
        //find the employee name from the rows using
        const name = this.rows.find(x => x.id === employeeId).username;
        if (confirm("Are you sure to delete " + name)) {
            this.deleteEmployee(employeeId);
        }
    }

    deleteEmployee(employeeId) {
        this.employeeService.deleteEmployee(employeeId).subscribe(
            data => {
                console.log(data);
                this.page(this.offset, this.limit);
            },
            err => {
                console.log(err);
            }
        );
    }

    onFilePicked(event) {
        const file = event.target.files[0];
        this.employeeService.uploadEmployees(file, this.clientId)
            .subscribe(
                data => {
                    this.successMessage = data.message;
                    this.page(this.offset, this.limit);
                },
                err => {
                    this.errorMessage = err.message;
                }
            );
    }

    page(offset, limit) {
        if (this.clientId === null) return;
        this.employeeService.getEmployees(offset, limit, this.clientId).subscribe(results => {
                const rows = [];
                this.employees = results.client.employees;
                if (this.employees !== null) {
                    this.count = this.employees.length;
                    this.employees.map((employee) => {
                        employee.id = employee._id;
                        rows.push(employee);
                    });
                }
                this.rows = rows;

            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        this.clientId = changes.clientId.currentValue;
        this.page(this.offset, this.limit);
    }

}
