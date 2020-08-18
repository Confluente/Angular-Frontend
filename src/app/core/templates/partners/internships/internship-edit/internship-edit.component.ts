import {Component, OnInit} from '@angular/core';
import {PartnersService} from "../../../../services/partners/partners.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-internship-edit',
    templateUrl: './internship-edit.component.html',
    styleUrls: ['./internship-edit.component.css']
})
export class InternshipEditComponent implements OnInit {

    internship: any;
    loading: boolean;

    // Different companies for which internships are supported
    companies = new Map([
        ["Optiver", "./assets/img/partners/optiver.png"]
    ]);

    // Categories that can be chosen
    categories = ["internship"];

    constructor(private partnersService: PartnersService,
                private activatedRoute: ActivatedRoute) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.internship = this.activatedRoute.snapshot.data.internship;
        this.loading = false;
    }

    submit() {
        this.loading = true;

        // Set the correct attributes
        this.internship.category = this.categories[0];
        this.internship.imageUrl = this.companies[this.internship.company];

        this.partnersService.editInternship(this.internship).subscribe(internship => {
            this.loading = false;

            // redirect to edited internship
            window.location.href = "/partners/internships/" + internship.id;
        });
    }
}
