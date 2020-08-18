import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupsService} from "../../../services/groups/groups.service";
import {FilterPipe} from "../../../pipes/filter.pipe";

@Component({
    selector: 'app-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

    // Different roles in a committee
    groupRoles = ["Member", "Chair", "Secretary", "Treasurer", "Board representative"];

    userGroup = [];

    usersNotInGroup = [];

    group;
    private allUsers;
    searchQueryUsersNotInGroup = "";
    searchQueryUsersInGroup = "";

    loading: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private groupsService: GroupsService,
                private filterPipe: FilterPipe) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.group = this.activatedRoute.snapshot.data.group;

        const idsInGroup = [];
        for (const member of this.group.members) {
            this.userGroup.push({
                name: member.displayName,
                func: member.user_group.func,
                id: member.user_group.userId
            });

            idsInGroup.push(member.user_group.userId);
        }

        this.allUsers = this.activatedRoute.snapshot.data.allUsers;
        for (const user of this.allUsers) {
            if (!idsInGroup.includes(user.id)) {
                this.usersNotInGroup.push({name: user.displayName, id: user.id});
            }
        }

        this.loading = false;
    }

    compare(userObject1, userObject2) {
        if (userObject1.name < userObject2.name) {
            return -1;
        } else {
            return 1;
        }
    }

    addUserToGroup(user, index) {
        this.userGroup.push({name: user.name, func: "Member", id: user.id});
        this.usersNotInGroup.splice(index, 1);
        this.userGroup.sort(this.compare);
        this.usersNotInGroup.sort(this.compare);
    }

    removeUserFromGroup(user, index) {
        this.usersNotInGroup.push({name: user.name, id: user.id});
        this.userGroup.splice(index, 1);
        this.usersNotInGroup.sort(this.compare);
        this.userGroup.sort(this.compare);
    }

    userCallbackFilter(user, query) {
        return (user as any).name.toLowerCase().includes(query.toLowerCase());
    }

    submit() {
        this.loading = true;

        this.groupsService.edit(this.group, this.userGroup).subscribe(_ => {
            this.loading = false;

            window.location.href = "/manage";
        });
    }

}
