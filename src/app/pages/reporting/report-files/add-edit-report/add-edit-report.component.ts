import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-edit-report',
  templateUrl: './add-edit-report.component.html',
  styleUrls: ['./add-edit-report.component.scss'],
})
export class AddEditReportComponent implements OnInit {

  positions = [];
  position = 'my position';
  constructor() { }

  ngOnInit() {
  }

}
