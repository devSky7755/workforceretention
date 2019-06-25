import {AfterContentInit, Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

}
