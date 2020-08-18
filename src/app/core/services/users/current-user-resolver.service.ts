import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {WebRequestService} from "../web-request.service";
import {catchError, mergeMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserResolverService implements Resolve<any> {

    constructor(private usersService: UsersService,
                private webRequestService: WebRequestService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.webRequestService.get("api/auth/").pipe(
            catchError(err => {
                console.warn("User not logged in.");
                return of({loggedIn: false, groups: null});
            }),
            mergeMap((result: HttpResponse<any>) => {
                return this.usersService.get(result.body.id);
            })
        );
    }
}
