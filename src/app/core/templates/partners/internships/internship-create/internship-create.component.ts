import {Component, OnInit} from '@angular/core';
import {PartnersService} from "../../../../services/partners/partners.service";

@Component({
    selector: 'app-internship-create',
    templateUrl: './internship-create.component.html',
    styleUrls: ['./internship-create.component.css']
})
export class InternshipCreateComponent implements OnInit {

    loading: boolean;

    // Different companies for which internships are supported
    companies = new Map([
        ["Optiver", "./assets/img/partners/optiver.png"],
    ]);

    // Categories that can be chosen
    categories = ["internship"];

    title: any;
    company: any;
    description: any;
    email: any;
    link: any;
    educationLevel: any;

    constructor(private partnersService: PartnersService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.loading = false;
    }

    submit() {
        this.loading = true;

        this.partnersService.createInternship({
            title: this.title,
            companyName: this.company,
            description: this.description,
            imageUrl: this.companies.get(this.company),
            contactEmail: this.email,
            link: this.link,
            educationLevel: this.educationLevel,
            category: this.categories[0]
        }).subscribe(internship => {
            this.loading = false;

            // redirect to created internship
            window.location.href = "/partners/internships/" + internship.id;
        });
    }

}
