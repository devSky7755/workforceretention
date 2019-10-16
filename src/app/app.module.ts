/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbTokenService } from "@nebular/auth";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: NbTokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.tokenService.get()
            .mergeMap((jsonToken: any) => {
                let token = ""
                if (jsonToken.token) {
                    token = jsonToken.token
                } else {
                    if (localStorage.getItem('employee')) {
                        // parse the employee object and check the expiration of the login. if the login time is expired
                        let employee = JSON.parse(localStorage.getItem('employee'));
                        token = employee.access_token
                    }
                }
                // Clone the request to add the new header
                const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
                // Pass the cloned request instead of the original request to the next handle
                return next.handle(clonedRequest);
            })
    }
}

@NgModule({
    declarations: [AppComponent, LogoutComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        AuthGuard,
        AuthService,
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
})
export class AppModule {
}
