import {Component, OnInit} from '@angular/core';
import {PartnersService} from "../../../../services/partners/partners.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-internship-delete',
    templateUrl: './internship-delete.component.html',
    styleUrls: ['./internship-delete.component.css']
})
export class InternshipDeleteComponent implements OnInit {

    loading: boolean;
    internship;

    constructor(private partnersService: PartnersService,
                private activatedRoute: ActivatedRoute) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.internship = this.activatedRoute.snapshot.data.internship;
        this.loading = false;
    }

    delete() {
        this.loading = true;

        // Delete the internship.
        this.partnersService.deleteInternship(this.internship.id).subscribe((_) => {
            this.loading = false;

            // redirect to edited internship
            window.location.href = "/manage";
        });
    }
}
