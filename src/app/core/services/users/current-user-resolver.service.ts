import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {WebRequestService} from "../web-request.service";
import {catchError, first, mergeMap, take} from "rxjs/operators";
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
                console.warn("User is not logged in.");
                return of(err);
            }),
            mergeMap((result: any) => {
                if (result.error === "Unauthorized") {
                    return of({loggedIn: false, groups: null});
                }

                return this.usersService.get(result.body.id).pipe(first());
            })
        );
    }
}
