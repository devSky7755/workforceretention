import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'ngx-request-a-quote',
  templateUrl: './request-a-quote.component.html',
  styleUrls: ['./request-a-quote.component.scss']
})
export class RequestAQuoteComponent implements OnInit {

  quoteForm: FormGroup;
  quote = {
    name: '',
    position: '',
    org_name: '',
    email: '',
    contact_number: '',
    workforce_size: '',
    cur_employee_turnover: '',
    confidential: '',
    license_required_status: false,
    phone_interview_with_platform_status: false,
    phone_interview_without_platform_status: false,
    exit_report_status: false
  }
  constructor() { }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.initRadioBtns();
    }, 10);
  }

  initRadioBtns() {
    let element_offs = ['license-required-status-off', 'phone-interview-with-platform-status-off', 'phone-interview-without-platform-status-off', 'exit-report-status-off']
    element_offs.forEach(element_off => {
      (<HTMLInputElement>document.getElementById(element_off)).checked = true;
    });
  }

  // validator function
  get(controlName) {
    return this.quoteForm.get(controlName);
  }

  createForm() {
    this.quoteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      org_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      contact_number: new FormControl('', [Validators.required]),
      workforce_size: new FormControl('', [Validators.required]),
      cur_employee_turnover: new FormControl('', [Validators.required]),
      confidential: new FormControl('', [Validators.required]),
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }
  requestAQuote() { }
}
