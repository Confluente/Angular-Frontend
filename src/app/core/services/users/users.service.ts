import {Injectable} from '@angular/core';
import {WebRequestService} from "../web-request.service";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private webRequestService: WebRequestService) {
    }

    /**
     * Function for retrieving all users from backend.
     */
    getAll() {
        return this.webRequestService.get("api/users").pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('UsersService.getAll: Error when getting all users from backend');
                console.error(err);
                return of([]);
            })
        );
    }

    /**
     * Function for retrieving a single user from the backend.
     * @param userId    The id of the user to retrieve.
     */
    get(userId) {
        return this.webRequestService.get("api/users/" + userId).pipe(
            map((res: HttpResponse<any>) => {
                const user = res.body;
                user.groups = res.body.groups;
                user.loggedIn = true;

                for (const group of user.groups) {
                    if (group.canOrganize) {
                        user.canOrganize = true;
                    }
                }

                if (user.isAdmin) {
                    user.canOrganize = true;
                }

                return user;
            }),
            catchError(err => {
                console.error('UsersService.get: Error when getting user from backend with id ' + userId);
                console.error(err);
                return of({});
            })
        );
    }

    /**
     * Function for submitting a user for creation in the backend.
     * @param user  Object representing the user to be created.
     */
    create(user) {
        return this.webRequestService.post("api/users", user).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('UsersService.create: Error when creating user in the backend.');
                console.error(err);

                if (err.status === 406 || err.status === 400) {
                    return of({error: err.status, message: err.error.message});
                }

                return of({});
            })
        );
    }

    /**
     * Function for submitting a user to be edited, including its relation to groups.
     * @param user              Object representing the (edited) user.
     */
    edit(user) {
        return this.webRequestService.put("api/users/" + user.id, user).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('UsersService.edit: Error when editing user in backend with id ' + user.id);
                console.error(err);

                return of({});
            })
        );
    }

    /**
     * Function for submitting a password change to the backend.
     * @param user      Object representing the user to be edited
     */
    changePassword(user) {
        return this.webRequestService.put("api/users/changePassword/" + user.id, user).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('UsersService.changePassword: Error when changing password in the backend for user ' +
                    'with id ' + user.id);
                console.error(err);
                return of({});
            })
        );
    }

    /**
     * Function for deleting user in the backend.
     * @param userId    Id of the user to be deleted.
     */
    delete(userId) {
        return this.webRequestService.delete("api/users/" + userId).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('UsersService.delete: Error when deleting user in the backend with id ' + userId);
                console.error(err);
                return of({});
            })
        );
    }
}
