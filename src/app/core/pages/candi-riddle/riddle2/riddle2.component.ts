import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-riddle',
    templateUrl: './riddle2.component.html',
    styleUrls: ['./riddle2.component.css']
})
export class RiddleComponent2 implements OnInit {

    constructor(titleService: Title) {
        titleService.setTitle("You did it!");
    }

    ngOnInit(): void {
    }
}
