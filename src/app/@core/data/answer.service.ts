import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLService } from "./url.service";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnswerService {

    constructor(private http: HttpClient, private urlService: URLService) {
    }

    // TODO: observables
    getAnswers() {
        return this.http.get(this.urlService.baseUrl + '/api/v1/answers');
    }

    getAnswer(id) {
        return this.http.get(this.urlService.baseUrl + '/api/v1/answers/' + id);
    }

    createAnswer(answer) {
        const body = JSON.stringify(answer);
        return this.http.post(this.urlService.baseUrl + '/api/v1/answers', body, httpOptions);
    }

    createManyAnswer(answer, surveyId, employeeId, completed_online, completed_admin, is_complete_submit = 0): Observable<any> {        
        var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
        const data = { end_date: new Date(aestTime), answers: answer, completed_online, completed_admin };
        const body = JSON.stringify(data);
        return this.http.post(this.urlService.baseUrl + `/api/v1/answers/add-many?surveyId=${surveyId}&isComplete=${is_complete_submit}&employeeId=${employeeId}`, body, httpOptions);
    }

    updateManyAnswer(answers, surveyId, employeeId, completed_online, completed_admin, is_complete_submit = 0): Observable<any> {
        const body = JSON.stringify(answers);
        return this.http.post(this.urlService.baseUrl + `/api/v1/answers/update-many?surveyId=${surveyId}&isComplete=${is_complete_submit}&isOnline=${completed_online}&isAdmin=${completed_admin}&employeeId=${employeeId}`, body, httpOptions);
    }

    getEmployeeSurveyAnswer(employeeId, surveyId): Observable<any> {
        return this.http.get(this.urlService.baseUrl + `/api/v1/answers/employee/survey?surveyId=${surveyId}&employeeId=${employeeId}`);
    }

    updateAnswer(answer, id) {
        const body = JSON.stringify(answer);
        return this.http.put(this.urlService.baseUrl + '/api/v1/answers/' + id, body, httpOptions);
    }

    deleteAnswer(id) {
        return this.http.delete(this.urlService.baseUrl + '/api/v1/answers' + id);
    }
}
