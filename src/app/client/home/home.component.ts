import { AfterContentInit, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "dots": true, "autoplaySpeed": 8000 };
    employee_details;
    constructor(private router: Router) {
    }

    ngOnInit() {
        if (localStorage.getItem('employee')) {
            // parse the employee object and check the expiration of the login. if the login time is expired
            const employee = JSON.parse(localStorage.getItem('employee'));
            const helper = new JwtHelperService();
            this.employee_details = helper.decodeToken(employee.access_token);
            if (!helper.isTokenExpired(employee.access_token)) {
                let routerLink = ''
                if (this.employee_details && this.employee_details.is_survey == 1) {
                    routerLink = '/client/dashboard'
                } else if (this.employee_details && this.employee_details.is_report == 1) {
                    routerLink = '/client/manager-report'
                }
                if (routerLink != '') {
                    this.router.navigateByUrl(routerLink);
                }
            }
        }
    }

    ngAfterContentInit() {
    }

}
