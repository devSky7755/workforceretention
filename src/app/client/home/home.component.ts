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
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "dots": true, "autoplaySpeed": 12000 };

    logoSlides = [
        { img: "assets/images/logos/pybar.png" },
        { img: "assets/images/logos/blacktown city council.png" },
        { img: "assets/images/logos/parra leagues.png" },
        { img: "assets/images/logos/abbott.png" },
        { img: "assets/images/logos/sofico.jpg" },
        { img: "assets/images/logos/campbells.png" },
        { img: "assets/images/logos/coffs.png" },
        { img: "assets/images/logos/lexisnexis-logo-335x189.png" },
        { img: "assets/images/logos/Perpetual_logo-700x259.png" },
        { img: "assets/images/logos/allens.jpg" },
        { img: "assets/images/logos/amp.jpg" },
        { img: "assets/images/logos/arnotts.png" },
    ];
    slideLogoConfig = {
        "slidesToShow": 4, "slidesToScroll": 4, "autoplay": true, "autoplaySpeed": 3000
    };
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
