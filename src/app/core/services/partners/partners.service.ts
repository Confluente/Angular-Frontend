import {Injectable} from '@angular/core';
import {WebRequestService} from "../web-request.service";
import {HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PartnersService {

    constructor(private webRequestService: WebRequestService) {
    }

    /**
     * Function for retrieving all internships from backend.
     */
    getAllInternships() {
        return this.webRequestService.get("api/partners/internships").pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('PartnersService.getAllInternships: Error when getting all internships.');
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for retrieving a single internship from the backend.
     * @param id    The id of the internship to retrieve.
     */
    getInternship(id) {
        return this.webRequestService.get("api/partners/internships/" + id).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('PartnersService.getInternship: Error when getting internship with id ' + id);
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for submitting an internship for creation in the backend.
     * @param internship    Object representing the internship to be created.
     */
    createInternship(internship) {
        return this.webRequestService.post("api/partners/internships", internship).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('PartnersService.createInternship: Error when creating internship');
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for submitting an internship to be edited in the backend.
     * @param internship    Object representing the (edited) internship.
     */
    editInternship(internship) {
        return this.webRequestService.put("api/partners/internships/" + internship.id, internship).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('PartnersService.editInternship: Error when editing internship with id ' + internship.id);
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for deleting an internship in the backend.
     * @param id    Id of the internship to be deleted.
     */
    deleteInternship(id) {
        return this.webRequestService.delete("api/partners/internships/" + id).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('PartnersService.deleteInternship: Error when deleting internship with id ' + id);
                console.error(err);
                return of();
            })
        );
    }
}
