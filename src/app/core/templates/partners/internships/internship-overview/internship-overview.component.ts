import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-internship-overview',
    templateUrl: './internship-overview.component.html',
    styleUrls: ['./internship-overview.component.css']
})
export class InternshipOverviewComponent implements OnInit {

    loading: boolean;
    internships: any[];

    constructor(private activatedRoute: ActivatedRoute) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.internships = this.activatedRoute.snapshot.data.allInternships;
    }

}
