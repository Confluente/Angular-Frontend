import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupsService} from "../../../services/groups/groups.service";

@Component({
    selector: 'app-group-delete',
    templateUrl: './group-delete.component.html',
    styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent implements OnInit {

    loading: boolean;
    group;

    constructor(private activatedRoute: ActivatedRoute,
                private groupsService: GroupsService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.group = this.activatedRoute.snapshot.data.group;
        this.loading = false;
    }

    submit() {
        this.loading = true;

        this.groupsService.delete(this.group.id).subscribe((_) => {
            this.loading = false;

            // redirect to '/manage'
            window.location.href = "/manage";
        });
    }
}
