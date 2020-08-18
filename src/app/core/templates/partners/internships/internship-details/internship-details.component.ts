import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-internship-details',
    templateUrl: './internship-details.component.html',
    styleUrls: ['./internship-details.component.css']
})
export class InternshipDetailsComponent implements OnInit {

    loading: boolean;
    internship: any;
    user: any;
    isUserInAcquisition = false;

    constructor(private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private sanitizer: DomSanitizer) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.internship = this.activatedRoute.snapshot.data.internship;
        this.internship.link = this.sanitizer.bypassSecurityTrustUrl(this.internship.link);

        this.authService.user.subscribe(user => {
            this.user = user;

            if (!this.user.loggedIn) { return; }

            for (const group of this.user.groups) {
                if (group.email === "acquisition@hsaconfluente.nl") {
                    this.isUserInAcquisition = true;
                }
            }
        });
    }
}