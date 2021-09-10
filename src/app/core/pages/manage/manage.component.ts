import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivitiesService} from "../../services/activities/activities.service";
import {SortPipe} from "../../pipes/sort.pipe";
import {DatePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {UsersService} from "../../services/users/users.service";
import {GroupsService} from "../../services/groups/groups.service";
import {PartnersService} from "../../services/partners/partners.service";
import {RolesService} from "src/app/core/services/roles/roles.service";

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
    companyOpportunities: any[];
    roles: any[];

    sortTypeActivities = 'id';
    sortReverseActivities = false;
    searchQueryActivities = "";

    sortTypeUsers = 'id';
    sortReverseUsers = false;
    searchQueryUsers = "";

    sortTypeGroups = 'id';
    sortReverseGroups = false;
    searchQueryGroups = "";

    sortTypeCompanyOpportunities = 'id';
    sortReverseCompanyOpportunities = false;
    searchQueryCompanyOpportunities = "";

    sortTypeRoles = 'id';
    sortReverseRoles = false;
    searchQueryRoles = "";

    typeSortMap = new Map([
        ['id', this.sortPipe.numberSort],
        ['name', this.sortPipe.lexicographicSort],
        ['date', this.sortPipe.dateSort],
        ['Organizer.displayName', this.sortPipe.lexicographicSort],
        ['published', this.sortPipe.booleanSort],
        ['displayName', this.sortPipe.lexicographicSort],
        ['email', this.sortPipe.lexicographicSort],
        ['role.name', this.sortPipe.lexicographicSort],
        ['fullName', this.sortPipe.lexicographicSort],
        ['email', this.sortPipe.lexicographicSort],
        ['canOrganize', this.sortPipe.booleanSort],
        ['title', this.sortPipe.lexicographicSort],
        ['companyName', this.sortPipe.lexicographicSort],
        ['category', this.sortPipe.lexicographicSort]
    ]);

    constructor(titleService: Title,
                private activatedRoute: ActivatedRoute,
                private activitiesService: ActivitiesService,
                private usersService: UsersService,
                private groupsService: GroupsService,
                private partnersService: PartnersService,
                private rolesService: RolesService,
                public sortPipe: SortPipe,
                private datePipe: DatePipe) {
        this.loading = true;

        titleService.setTitle("Manage Panel");

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

        if (this.user.role.USER_VIEW_ALL) {
            this.users = this.activatedRoute.snapshot.data.allUsers;
        }

        if (this.user.role.GROUP_VIEW) {
            this.groups = this.activatedRoute.snapshot.data.allGroups;
        }

        if (this.user.role.ROLE_VIEW) {
            this.roles = this.activatedRoute.snapshot.data.allRoles;
        }

        for (const group of this.user.groups) {
            if (group.email === "acquisition@hsaconfluente.nl") {
                this.isUserInAcquisition = true;
            }
        }

        if (this.isUserInAcquisition || this.user.role.PARTNER_VIEW) {
            this.companyOpportunities = this.activatedRoute.snapshot.data.allCompanyOpportunities;
        }


        this.sortUsers('displayName');
        this.sortGroups('fullName');

        this.loading = false;
    }

    // Allow toggling the 'published' attribute of activities
    togglePublishedActivity(activityToBeToggled) {
        activityToBeToggled.published = !activityToBeToggled.published;
        activityToBeToggled.organizerId = activityToBeToggled.organizer.id;
        this.activitiesService.edit(activityToBeToggled, true, null).subscribe();
    }

    activityCallback(activity, query) {
        return activity.organizer.displayName.toLowerCase().includes(query.toLowerCase())
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

    companyOpportunityCallback(opportunity, query) {
        return opportunity.title.toLowerCase().includes(query.toLowerCase())
            || opportunity.companyName.toLowerCase().includes(query.toLowerCase())
            || opportunity.educationLevel.toLowerCase().includes(query.toLowerCase());
    }

    roleCallback(role, query) {
        return role.name.toLowerCase().includes(query.toLowerCase());
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

    sortCompanyOpportunities(type) {
        if (this.sortTypeCompanyOpportunities === type) {
            this.sortReverseCompanyOpportunities = !this.sortReverseCompanyOpportunities;
        } else {
            this.sortReverseCompanyOpportunities = false;
        }
        this.sortTypeCompanyOpportunities = type;
    }

    sortRoles(type) {
        console.log(this);
        if (this.sortTypeRoles === type) {
            this.sortReverseRoles = !this.sortReverseRoles;
        } else {
            this.sortReverseRoles = false;
        }
        this.sortTypeRoles = type;
    }

    // Delete functions
    deleteActivity(activity) {
        this.activitiesService.delete(activity.id).subscribe();
        this.archive.splice(this.archive.indexOf(activity), 1);
    }

    deleteUser(user) {
        this.usersService.delete(user.id).subscribe();
        this.users.splice(this.users.indexOf(user), 1);
    }

    deleteGroup(group) {
        this.groupsService.delete(group.id).subscribe();
        this.groups.splice(this.groups.indexOf(group), 1);
    }

    deleteCompanyOpportunity(opportunity) {
        this.partnersService.deleteCompanyOpportunity(opportunity.id).subscribe();
        this.companyOpportunities.splice(this.companyOpportunities.indexOf(opportunity), 1);
    }

    deleteRole(role) {
        this.rolesService.delete(role.id).subscribe();
        this.roles.splice(this.roles.indexOf(role), 1);
    }
}