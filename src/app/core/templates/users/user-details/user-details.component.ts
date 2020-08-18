import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    user: any;
    loading: boolean;

    constructor(private activatedRoute: ActivatedRoute) {
        this.loading = true;
    }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.routeConfig.path === "user/profile") {
            this.user = this.activatedRoute.snapshot.data.currentUser;
        } else {
            this.user = this.activatedRoute.snapshot.data.user;
        }
        this.loading = false;
    }
}
