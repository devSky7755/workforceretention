import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RequestAQuoteService } from "../../@core/data/requestaquote.service";

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
    confidential: '0',
    license_required_status: '1',
    phone_interview_with_platform_status: '1',
    phone_interview_without_platform_status: '0',
    exit_report_status: '1'
  }

  collapse = {
    license: true,
    phone_interview: true,
    phone_interview_without: true,
    exit_report: true,
    confidential: true
  }
  
  constructor(private requestAQuoteService: RequestAQuoteService) { }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.initRadioBtns();
    }, 10);
  }

  initRadioBtns() {
    let element_offs = ['confidential-off', 'phone-interview-without-platform-status-off']
    let element_ons = ['license-required-status-on', 'phone-interview-with-platform-status-on', 'exit-report-status-on']
    element_offs.forEach(element_off => {
      (<HTMLInputElement>document.getElementById(element_off)).checked = true;
    });
    element_ons.forEach(element_on => {
      (<HTMLInputElement>document.getElementById(element_on)).checked = true;
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
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }
  requestAQuote() {
    let param = {
      name: this.get('name').value,
      position: this.get('position').value,
      org_name: this.get('org_name').value,
      email: this.get('email').value,
      contact_number: this.get('contact_number').value,
      workforce_size: this.get('workforce_size').value,
      cur_employee_turnover: this.get('cur_employee_turnover').value,
      confidential: parseInt(this.quote.confidential, 10),
      license_required_status: parseInt(this.quote.license_required_status, 10),
      phone_interview_with_platform_status: parseInt(this.quote.phone_interview_with_platform_status, 10),
      phone_interview_without_platform_status: parseInt(this.quote.phone_interview_without_platform_status, 10),
      exit_report_status: parseInt(this.quote.exit_report_status, 10)
    }

    this.requestAQuoteService.submitQuotation(param).subscribe(
      data => {
        alert('Your request for a quote has been sent.')
      },
      err => {
        console.log(err);
      }
    );
  }
}
