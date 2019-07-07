import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class URLService {
    baseUrl = isDevMode() ? 'http://localhost:8080' : ''
    // baseUrl = '';
}
