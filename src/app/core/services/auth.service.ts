import {Injectable} from '@angular/core';

import {catchError} from 'rxjs/operators';

import {CookieService} from "ngx-cookie-service";
import {WebRequestService} from "./web-request.service";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private cookieService: CookieService,
                private webService: WebRequestService) {
    }

    login(email, password) {
        return this.webService.post("api/auth/login/", {email, password})
            .pipe(catchError(err => {
                alert(err.error.data);
                return of();
            }))
            .subscribe((_) => {
                window.location.reload();
            });
    }

    logout() {
        this.cookieService.delete("session", "/");

        window.location.reload();
    }
}
