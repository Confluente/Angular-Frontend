import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivitiesService} from "../../../services/activities/activities.service";
import {TableExport} from "tableexport";

@Component({
    selector: 'app-activity-details',
    templateUrl: './activity-details.component.html',
    styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

    user: any;

    loading: boolean;
    activity: any;
    private readonly activityId: number;
    activityDescription: string;
    answers: any[];
    isUserOrganizing: boolean;
    subscribed: boolean;
    deadlinePassed: boolean;
    clickedExport: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private activitiesService: ActivitiesService) {
        this.loading = true;
        this.activityId = this.activatedRoute.snapshot.params.activityId;
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.currentUser;

        this.activity = this.activatedRoute.snapshot.data.activity;

        if (this.activity.canSubscribe) {
            window.location.href = "/activities/" + this.activityId + "#signup";
        }

        // To split the description up into paragraphs
        this.activityDescription = this.activity.description.replace(/\r/g, "").split(/\n/);

        // format the subscriptions
        this.answers = [];
        for (let i = 0; i < this.activity.numberOfQuestions; i++) {
            if (this.activity.typeOfQuestion[i] === '☑ checkboxes') {
                const list = [];
                for (const option of this.activity.formOptions[i].length) {
                    list.push("");
                }
                this.answers.push(list);
            } else {
                this.answers.push("");
            }
        }

        // check whether the logged in user is part of the group that is organizing the event
        for (const group of this.user.groups) {
            if (group.id === this.activity.OrganizerId) {
                this.isUserOrganizing = true;
            }
        }

        if (this.user.isAdmin) {
            this.isUserOrganizing = true;
        }

        // check whether the user that is logged in is already subscribed to the activity
        for (const participant of this.activity.participants) {
            if (participant.id === this.user.id) {
                this.subscribed = true;
            }
        }

        // check if the current date is passed the subscription deadline
        const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        if (now > this.activity.subscriptionDeadline) {
            this.deadlinePassed = true;
        }

        this.loading = false;
    }

    // redirects user to login page
    login() {
        window.location.href = "/login";
    }

    // generates three buttons with which you can export the table
    exportTable() {
        this.clickedExport = true;
        // @ts-ignore
        TableExport(document.getElementsByTagName("table"));
        // @ts-ignore
        TableExport.prototype.typeConfig.date.assert = () => false;
    }

    // unsubscribes the user from the activity
    remove() {
        this.loading = true;
        this.activitiesService.deleteSubscription(this.activityId).subscribe((_) => {
            this.loading = false;

            // reload page to show deletion
            window.location.reload();
        });
    }

    // Allow setting the 'published' attribute of activities to true
    publishActivity(activityToBePublished) {
        activityToBePublished.published = true;

        // Set organizer to displayName of Organizer (required for API)
        activityToBePublished.organizer = activityToBePublished.Organizer.displayName;
        this.activitiesService.edit(activityToBePublished, true, null).subscribe((_) => {
            window.location.reload();
        });
    }

    // Allow setting the 'published' attribute of activities to false
    unpublishActivity(activityToBeUnpublished) {
        activityToBeUnpublished.published = false;

        // Set organizer to displayName of Organizer (required for API)
        activityToBeUnpublished.organizer = activityToBeUnpublished.Organizer.displayName;
        this.activitiesService.edit(activityToBeUnpublished, true, null).subscribe((_) => {
            window.location.reload();
        });
    }

    submit() {
        this.loading = true;

        // Check if all required field are filled in
        let filledIn = true;
        for (let i = 0; i < this.activity.numberOfQuestions; i++) {
            if (this.activity.required[i] === 'true') {
                if (this.activity.typeOfQuestion[i] === '☰ text' && this.answers[i] === "") {
                    filledIn = false;
                } else if (this.activity.typeOfQuestion[i] === '◉ multiple choice' && this.answers[i] === "") {
                    filledIn = false;
                } else if (this.activity.typeOfQuestion[i] === '☑ checkboxes' && !this.answers[i].includes(true)) {
                    filledIn = false;
                }
            }
        }

        // rejects submission if form is not completely filled in
        if (!filledIn) {
            this.loading = false;
            return alert("Not all required fields were filled in.");
        }

        // Format answer correctly
        this.answers[0] = this.user.displayName;
        this.answers[1] = this.user.email;
        for (let i = 2; i < this.activity.numberOfQuestions; i++) {
            let answer = "";
            if (this.activity.typeOfQuestion[i] === '☑ checkboxes') {
                for (let j = 0; j < this.activity.formOptions[i].length; j++) {
                    if (this.answers[i][j] === true) {
                        if (answer !== "") { answer += " - "; }
                        answer += this.activity.formOptions[i][j].toString();
                    }
                }
                this.answers[i] = answer;
            }
        }

        this.activitiesService.subscribe(this.answers, this.activityId).subscribe((_) => {
            this.loading = false;

            // reload page to show submission
            window.location.reload();
        });
    }
}
