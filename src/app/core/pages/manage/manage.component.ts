import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivitiesService} from "../../services/activities/activities.service";
import {SortPipe} from "../../pipes/sort.pipe";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    providers: [DatePipe],
    styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    user: any;
    loading: boolean;
    isUserInAcquisition = false;
    date;
    archive: any[];

    users: any[];
    groups: any[];
    activities: any[];
    internships: any[];

    sortTypeActivities = 'id';
    sortReverseActivities = false;
    searchQueryActivities = "";

    sortTypeUsers = 'id';
    sortReverseUsers = false;
    searchQueryUsers = "";

    sortTypeGroups = 'id';
    sortReverseGroups = false;
    searchQueryGroups = "";

    sortTypeInternships = 'id';
    sortReverseInternships = false;
    searchQueryInternships = "";

    typeSortMap = new Map([
        ['id', this.sortPipe.numberSort],
        ['name', this.sortPipe.lexicographicSort],
        ['date', this.sortPipe.dateSort],
        ['Organizer.displayName', this.sortPipe.lexicographicSort],
        ['published', this.sortPipe.booleanSort],
        ['displayName', this.sortPipe.lexicographicSort],
        ['email', this.sortPipe.lexicographicSort],
        ['isAdmin', this.sortPipe.booleanSort],
        ['fullName', this.sortPipe.lexicographicSort],
        ['email', this.sortPipe.lexicographicSort],
        ['canOrganize', this.sortPipe.booleanSort],
        ['title', this.sortPipe.lexicographicSort],
        ['companyName', this.sortPipe.lexicographicSort],
        ['educationLevel', this.sortPipe.lexicographicSort]
    ]);

    constructor(private activatedRoute: ActivatedRoute,
                private activitiesService: ActivitiesService,
                public sortPipe: SortPipe,
                private datePipe: DatePipe) {
        this.loading = true;

        // Variables for tracking search & sorting in activities tab
        this.sortTypeActivities = 'id';
        this.sortReverseActivities = false;

        const today = new Date();
        this.date = this.datePipe.transform(new Date(today.setDate(today.getDate() - 1)), "yyyy-MM-dd");

        // Variables for tracking search & sorting in users tab
        this.sortTypeUsers = 'id';
        this.sortReverseUsers = false;

        // Variables for tracking search & sorting in groups tab
        this.sortTypeGroups = 'id';
        this.sortReverseGroups = false;
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.currentUser;

        if (!this.user.loggedIn) {
            return;
        }

        this.archive = this.activatedRoute.snapshot.data.allActivities;

        if (this.user.isAdmin) {
            this.users = this.activatedRoute.snapshot.data.allUsers;
            this.groups = this.activatedRoute.snapshot.data.allGroups;
        }

        for (const group of this.user.groups) {
            if (group.email === "acquisition@hsaconfluente.nl") {
                this.isUserInAcquisition = true;
            }
        }

        if (this.isUserInAcquisition || this.user.isAdmin) {
            this.internships = this.activatedRoute.snapshot.data.allInternships;
        }

        this.loading = false;
    }

    // Allow toggling the 'published' attribute of activities
    togglePublishedActivity(activityToBeToggled) {
        activityToBeToggled.published = !activityToBeToggled.published;
        activityToBeToggled.organizer = activityToBeToggled.Organizer.fullName;
        this.activitiesService.edit(activityToBeToggled, true, null).subscribe();
    }

    activityCallback(activity, query) {
        return activity.Organizer.displayName.toLowerCase().includes(query.toLowerCase())
            || activity.name.toLowerCase().includes(query.toLowerCase());
    }

    activityDateFilter(activity, query) {
        return activity.date.getTime() >= new Date(query).getTime();
    }

    userCallback(user, query) {
        return user.email.toLowerCase().includes(query.toLowerCase())
            || user.displayName.toLowerCase().includes(query.toLowerCase());
    }

    groupCallback(group, query) {
        return group.fullName.toLowerCase().includes(query.toLowerCase())
            || group.email.toLowerCase().includes(query.toLowerCase());
    }

    internshipCallback(internship, query) {
        return internship.title.toLowerCase().includes(query.toLowerCase())
            || internship.companyName.toLowerCase().includes(query.toLowerCase())
            || internship.educationLevel.toLowerCase().includes(query.toLowerCase());
    }

    // Ugly repeated code
    sortActivities(type) {
        if (this.sortTypeActivities === type) {
            this.sortReverseActivities = !this.sortReverseActivities;
        } else {
            this.sortReverseActivities = false;
        }
        this.sortTypeActivities = type;
    }

    sortUsers(type) {
        if (this.sortTypeUsers === type) {
            this.sortReverseUsers = !this.sortReverseUsers;
        } else {
            this.sortReverseUsers = false;
        }
        this.sortTypeUsers = type;
    }

    sortGroups(type) {
        if (this.sortTypeGroups === type) {
            this.sortReverseGroups = !this.sortReverseGroups;
        } else {
            this.sortReverseGroups = false;
        }
        this.sortTypeGroups = type;
    }

    sortInternships(type) {
        if (this.sortTypeInternships === type) {
            this.sortReverseInternships = !this.sortReverseInternships;
        } else {
            this.sortReverseInternships = false;
        }
        this.sortTypeInternships = type;
    }
}
