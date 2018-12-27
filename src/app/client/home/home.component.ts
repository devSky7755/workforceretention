import {Component, OnInit} from '@angular/core';
import {NbSpinnerService} from "@nebular/theme";

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private spinnerService: NbSpinnerService) {
    }

    ngOnInit() {
        this.spinnerService.load();
    }

}
