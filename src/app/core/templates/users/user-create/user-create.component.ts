import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

    loading = false;

    // Different tracks within the honors academy
    tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility", "Master Honors"];

    // Different generations in which students can say that started at honors academy
    generations = [2016, 2017, 2018, 2019, 2020, 2021];

    // Different membership statuses
    memberships = ["Member", "Alumni", "Associate member"];

    // declare form fields for ng model bindings
    email;
    personalEmail;
    firstName;
    lastName;
    dob;
    membership;
    major;
    address;
    honorsTrack;
    generation;
    cardNumber;
    phone;
    password;
    portraitRight;
    DOBRight;

    constructor(titleService: Title,
                private usersService: UsersService) {
        this.loading = true;

        titleService.setTitle("Register!");
    }

    ngOnInit(): void {
        this.loading = false;
    }

    submit() {
        this.loading = true;

        if (!this.firstName || !this.lastName || !this.password || !this.email || !this.membership) {
            this.loading = false;
            return alert("Not all required fields were filled in!");
        }

        if (!this.email.endsWith("@student.tue.nl")) {
            this.loading = false;
            return alert("You did not enter a valid TU/e email!");
        }

        this.usersService.create({
            email: this.email,
            personalEmail: this.personalEmail,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            honorsMembership: this.membership,
            major: this.major,
            address: this.address,
            track: this.honorsTrack,
            honorsGeneration: +this.generation,
            campusCardNumber: this.cardNumber,
            mobilePhoneNumber: this.phone,
            password: this.password,
            consentWithPortraitRight: this.portraitRight,
            consentWithDOBRight: this.DOBRight
        }).subscribe(activity => {
            this.loading = false;

            // redirect
            window.location.href = "/submitted_registration";
        });
    }

}
