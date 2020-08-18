import {Injectable} from '@angular/core';
import {WebRequestService} from "../web-request.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {PartnersService} from "./partners.service";

@Injectable({
    providedIn: 'root'
})
export class AllInternshipsResolverService implements Resolve<any> {

    constructor(private partnersService: PartnersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.partnersService.getAllInternships();
    }
}
