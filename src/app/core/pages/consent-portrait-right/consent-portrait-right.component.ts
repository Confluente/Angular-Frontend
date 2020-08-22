import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "../../services/notifications/notifications.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-consent-portrait-right',
    templateUrl: './consent-portrait-right.component.html',
    styleUrls: ['./consent-portrait-right.component.css']
})
export class ConsentPortraitRightComponent implements OnInit {

    private user;

    constructor(private notificationsService: NotificationsService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.user = this.activatedRoute.snapshot.data.currentUser;
    }

    submit() {
        this.notificationsService.portraitRight(this.user.id, true).subscribe(user => {
            // redirect to home screen
            window.location.href = "/home";
        });
    }

}
