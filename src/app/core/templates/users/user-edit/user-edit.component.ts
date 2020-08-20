import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../services/users/users.service";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user;
    groups;
    loading: boolean;
    groupSelection;

    // Different tracks within the honors academy
    tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility", "Master Honors"];

    // Different roles in a committee
    groupRoles = ["Member", "Chair", "Secretary", "Treasurer", "Board representative"];

    // Different membership statuses
    memberships = ["Member", "Alumni", "Associate member"];

    // Different generations in which students can say that started at honors academy
    generations = [2016, 2017, 2018, 2019, 2020];

    // Different roles for users
    role = {
        roles: [{
            id: "User"
        }, {
            id: "Admin"
        }]
    };

    selectedRole = {
        id: "User"
    };

    member;

    constructor(private activatedRoute: ActivatedRoute,
                private usersService: UsersService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.user;

        if (this.user.isAdmin) {
            this.selectedRole.id = "Admin";
        }

        this.member = this.user.groups;
        this.groups = this.activatedRoute.snapshot.data.allGroups;

        this.loading = false;

        const memberGroups = [];

        // get indices of groups of which user is member
        for (const group of this.member) {
            memberGroups.push(group.id);
        }

        this.groupSelection = [];
        for (const group of this.groups) {
            if (memberGroups.includes(group.id)) {
                this.groupSelection.push({
                    fullName: group.fullName,
                    id: group.id,
                    selected: true,
                    role: this.findMemberGroup(group.id).members[0].user_group.func
                });
            } else {
                this.groupSelection.push({
                    fullName: group.fullName,
                    id: group.id,
                    selected: false,
                    role: "Member"
                });
            }
        }
    }

    // Function to find the user_group of one of the groups that the user is a member of
    private findMemberGroup(id) {
        for (const group of this.member) {
            if (group.id === id) {
                return group;
            }
        }

        console.error("UserEditComponent.findMemberGroup: Error when fining member group");
    }

    // Helper method
    selectedGroups() {
        const filtered = [];
        for (const group of this.groupSelection) {
            if (group.selected) {
                filtered.push(group);
            }
        }

        return filtered;
    }

    submit() {
        this.loading = true;

        if (!this.user.firstName || !this.user.lastName || !this.user.email) {
            this.loading = false;
            return alert("Not all required fields were filled in!");
        }

        this.user.isAdmin = this.selectedRole.id === "Admin";
        this.user.displayName = this.user.firstName + " " + this.user.lastName;

        this.usersService.edit(this.user, this.groupSelection).subscribe((_) => {
            this.loading = false;

            // redirect to '/manage'
            window.location.href = "/manage";
        });
    }

}
