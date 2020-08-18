import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpecificUserResolverService implements Resolve<any> {

    constructor(private usersService: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.usersService.get(route.paramMap.get("userId"));
    }
}
