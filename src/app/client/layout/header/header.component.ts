import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {EmployeeService} from "../../../@core/data/employee.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClientService} from "../../../@core/data/client.service";


@Component({
    selector: 'ngx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuth: boolean = false;
    authSubscription: Subscription;
    employee_details;

    constructor(private router: Router,
                private employeeService: EmployeeService,
                private clientService: ClientService) {
    }

    ngOnInit() {
        // here parse the employee
        // check the localStorage. if get the user id then set isAuth to true
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            const employee = JSON.parse(localStorage.getItem('employee'));
            // then execute login function
            const helper = new JwtHelperService();
            // const decodedToken = helper.decodeToken(employee.access_token);
            // console.log(decodedToken);
            this.employee_details = helper.decodeToken(employee.access_token);
            if (helper.isTokenExpired(employee.access_token)) {
                this.logout();
            } else {
                this.isAuth = true;
                if (this.employeeService.clientImage === '') {
                    const decodedToken = helper.decodeToken(employee.access_token);
                    this.getClient(decodedToken.client);
                }
            }
        }
        this.authSubscription = this.employeeService.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    getClient(client_id) {
        // here get the client and set the image
        this.clientService.getClient(client_id).subscribe(
            res => {
                console.log(res);
                this.employeeService.clientImage = res.client.image;
            }
        );
    }

    logout() {
        // remove the employee from the localStorage
        localStorage.removeItem('employee');
        // employeeService authChange make this false
        this.employeeService.authChange.next(false);
        this.employeeService.employee = null;
        //redirect to login page
        this.router.navigateByUrl('/client/login');
    }

}
