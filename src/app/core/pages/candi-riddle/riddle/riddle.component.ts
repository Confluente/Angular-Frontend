import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-riddle',
    templateUrl: './riddle.component.html',
    styleUrls: ['./riddle.component.css']
})
export class RiddleComponent implements OnInit {

    constructor(titleService: Title) {
        titleService.setTitle("Riddle");
    }

    ngOnInit(): void {
    }
}
