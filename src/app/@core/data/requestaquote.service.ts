import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLService } from "./url.service";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RequestAQuoteService {

    constructor(private http: HttpClient, private urlService: URLService) {
    }

    submitQuotation(param): Observable<any> {
        const body = JSON.stringify(param);
        return this.http.post(this.urlService.baseUrl + `/api/v1/requestaquote`, body, httpOptions);
    }
}
