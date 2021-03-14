import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-riddle',
    templateUrl: './riddle1.component.html',
    styleUrls: ['./riddle1.component.css']
})
export class RiddleComponent1 implements OnInit {

    constructor(titleService: Title) {
        titleService.setTitle("Riddle1");
    }

    ngOnInit(): void {
    }
}
