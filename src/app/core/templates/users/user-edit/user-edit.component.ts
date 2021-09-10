import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../services/users/users.service";
import {DatePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    providers: [DatePipe],
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user;
    currentUser;
    groups;
    loading: boolean;
    roles;
    dob;
    personalEmail;

    // Different tracks within the honors academy
    tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility", "Master Honors"];

    // Different roles in a committee
    groupRoles = ["Member", "Chair", "Secretary", "Treasurer", "Board representative"];

    // Different membership statuses
    memberships = ["Member", "Alumni", "Associate member"];

    // Different generations in which students can say that started at honors academy
    generations = [2016, 2017, 2018, 2019, 2020, 2021];

    // Different roles for users
    selectedRole: any = {name: "Super admin"};

    member;

    constructor(titleService: Title,
                private activatedRoute: ActivatedRoute,
                private datePipe: DatePipe,
                private usersService: UsersService) {
        this.loading = true;

        titleService.setTitle("Edit User");
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.user;
        this.currentUser = this.activatedRoute.snapshot.data.currentUser;
        this.user.dob = this.datePipe.transform(this.user.dob, "yyyy-MM-dd");

        if (this.currentUser.role.USER_MANAGE && this.currentUser.role.ROLE_MANAGE) {
            this.roles = {roles: this.activatedRoute.snapshot.data.allRoles};

            for (const role of this.roles.roles) {
                if (role.id === this.user.role.id) {
                    this.selectedRole.name = role.name;
                }
            }
        }

        this.loading = false;
    }

    submit() {
        this.loading = true;

        if (!this.user.firstName || !this.user.lastName || !this.user.email) {
            this.loading = false;
            return alert("Not all required fields were filled in!");
        }

        if (this.currentUser.role.USER_MANAGE && this.currentUser.role.ROLE_MANAGE) {
            delete this.user.role;
            for (const role of this.roles.roles) {
                if (role.name === this.selectedRole.name) {
                    this.user.roleId = role.id;
                }
            }
        }

        this.usersService.edit(this.user).subscribe((_) => {
            this.loading = false;

            // redirect to '/manage'
            window.location.href = "/manage";
        });
    }

}
