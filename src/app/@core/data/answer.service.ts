import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLService} from "./url.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
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

    updateAnswer(answer, id) {
        const body = JSON.stringify(answer);
        return this.http.put(this.urlService.baseUrl + '/api/v1/answers/' + id, body, httpOptions);
    }

    deleteAnswer(id) {
        return this.http.delete(this.urlService.baseUrl + '/api/v1/answers' + id);
    }
}
