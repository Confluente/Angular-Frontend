import {Injectable} from '@angular/core';
import {WebRequestService} from '../web-request.service';
import {of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {

    constructor(private webRequestService: WebRequestService) {
    }

    /**
     * Function for retrieving all published activities from the backend.
     */
    getAll() {
        return this.webRequestService.get("api/activities").pipe(
            map((res: HttpResponse<any>) => {
                (res.body as any[]).map(activity => {
                    activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                    activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline)) ?
                        new Date(activity.subscriptionDeadline) : null;
                    return activity;
                });

                return res.body;
            }),
            catchError(err => {
                console.error('ActivitiesService.getAll: Caught error when getting all activities.');
                console.error(err);
                return of([]);
            })
        );
    }

    /**
     * Function for retrieving all activities from the backend.
     */
    getAllManage() {
        return this.webRequestService.get("api/activities/manage").pipe(
            map((res: HttpResponse<any>) => {
                const activities = res.body;

                return activities.map((activity) => {
                    // set correct date format (or null if not defined)
                    activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                    activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline)) ?
                        new Date(activity.subscriptionDeadline) : null;
                    return activity;
                });
            }),
            catchError(err => {
                console.error('ActivitiesService.getAllManage: Error when getting ' +
                    'all activities for management table.');
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for retrieving a single activity from the backend based on id.
     * @param activityId    The id of the activity.
     */
    get(activityId) {
        return this.webRequestService.get("api/activities/" + activityId).pipe(
            map((res: HttpResponse<any>) => {
                const activity: any = res.body;

                // set correct date format (or null if not defined)
                activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline))
                    ? new Date(activity.subscriptionDeadline) : null;
                return activity;
            }),
            catchError(err => {
                console.error('ActivitiesService.get: Caught error when getting activity with id: ' + activityId);
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for submitting created activity to backend.
     * @param coverImage    The coverImage of the new activity.
     * @param activity      The object representing the activity.
     */
    create(coverImage, activity) {
        return this.webRequestService.post("api/activities", activity).pipe(
            mergeMap((act: HttpResponse<any>) => {
                if (act.body.hasCoverImage) {
                    this.webRequestService.post("api/activities/pictures/" + act.body.id, coverImage).subscribe();
                    return of(act.body);
                } else {
                    return of(act.body);
                }
            }),
            catchError(err => {
                console.error('ActivitiesService.post: Error when creating activity.');
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for submitting edited activities to backend
     * @param activity      the activity
     * @param keepCurrent   whether to keep the current picture
     * @param coverImage    the new cover image
     * @returns submitted   edited activity (except the picture)
     */
    edit(activity, keepCurrent, coverImage) {
        return this.webRequestService.put("api/activities/" + activity.id, activity)
            .pipe(
                mergeMap((res: HttpResponse<any>) => {
                    if (!keepCurrent) {
                        this.webRequestService.put("api/activities/pictures/" + activity.id, coverImage).subscribe();
                        return of(res.body);
                    } else {
                        return of(res.body);
                    }
                }),
                catchError(err => {
                    console.error('ActivitiesService.edit: Error when editing activity with id: ' + activity.id);
                    console.error(err);
                    return of();
                })
            );
    }

    /**
     * Function for submitting subscription to backend.
     * @param subscription  Answers of the user that wants to subscribe.
     * @param activityId    The id of the activity being subscribed to.
     */
    subscribe(subscription, activityId) {
        return this.webRequestService.post("api/activities/subscriptions/" + activityId, subscription).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(err => {
                console.error('ActivitiesService.subscribe: Error when subscribing to activity with id: ' + activityId);
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for submitting a deletion of subscription request to backend.
     * @param activityId    The id of the activity
     */
    deleteSubscription(activityId) {
        return this.webRequestService.delete("api/activities/subscriptions/" + activityId,
            {observe: 'response', withCredentials: true, responseType: 'text'}).pipe(
            map((res) => {
                return res;
            }),
            catchError(err => {
                console.error('ActivitiesService.deleteSubscription: Error when deleting subscription from activity ' +
                    'with id: ' + activityId);
                console.error(err);
                return of();
            })
        );
    }

    /**
     * Function for deleting activity in backend based on id.
     * @param activityId    The id of the activity.
     */
    delete(activityId) {
        return this.webRequestService.delete("api/activities/" + activityId);
    }
}
