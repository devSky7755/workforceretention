import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLService } from "./url.service";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactService {

    constructor(private http: HttpClient, private urlService: URLService) {
    }

    sendEmail(param): Observable<any> {
        const body = JSON.stringify(param);
        return this.http.post(this.urlService.baseUrl + `/api/v1/contact`, body, httpOptions);
    }
}
