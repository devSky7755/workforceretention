import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class URLService {
    baseUrl = !environment.production ? 'http://localhost:8080' : ''
    // baseUrl = '';
}
