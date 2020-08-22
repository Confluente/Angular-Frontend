import {Injectable} from '@angular/core';
import {WebRequestService} from "../web-request.service";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private webRequestService: WebRequestService) {
    }

    /**
     * Sets portrait right consent for a user to given answer in database.
     * @param userId    Id of the user to change the portrait right for.
     * @param answer    The answer to set it to.
     */
    portraitRight(userId, answer) {
        return this.webRequestService.put("api/notifications/portraitRight/" + userId, {answer}).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('NotificationsService.portraitRight: Error when changing portraitRight for user ' +
                    'with id ' + userId);
                console.error(err);
                return of();
            })
        );
    }
}
