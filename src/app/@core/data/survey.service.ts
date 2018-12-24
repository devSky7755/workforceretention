import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLService} from "./url.service";
import {Observable} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SurveyService {

    surveyTypes = [
        {Id: 1, type: 'recap'},
        {Id: 2, type: 'exit'}
    ];

    constructor(private http: HttpClient, private urlService: URLService) {
    }

    // TODO: observables
    getSurveys(page, limit): Observable<any> {
        return this.http.get(this.urlService.baseUrl + `/api/v1/surveys?page=${page}&perPage=${limit}`);
    }

    getSurvey(id): Observable<any> {
        return this.http.get(this.urlService.baseUrl + '/api/v1/surveys/' + id);
    }

    getSurveyQuestions(surveyId): Observable<any> {
        return this.http.get(this.urlService.baseUrl + '/api/v1/surveys/questions/' + surveyId);
    }

    createSurvey(survey, userId): Observable<any> {
        const body = JSON.stringify(survey);
        return this.http.post(this.urlService.baseUrl + `/api/v1/surveys/${userId}`, body, httpOptions);
    }

    updateSurvey(survey, id): Observable<any> {
        const body = JSON.stringify(survey);
        return this.http.put(this.urlService.baseUrl + '/api/v1/surveys/' + id, body, httpOptions);
    }

    deleteSurvey(id): Observable<any> {
        return this.http.delete(this.urlService.baseUrl + '/api/v1/surveys/' + id);
    }
}
