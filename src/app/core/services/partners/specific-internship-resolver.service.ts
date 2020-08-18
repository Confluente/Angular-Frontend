import {Injectable} from '@angular/core';
import {PartnersService} from "./partners.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpecificInternshipResolverService implements Resolve<any> {

    constructor(private partnersService: PartnersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.partnersService.getInternship(route.paramMap.get("internshipId"));
    }
}
