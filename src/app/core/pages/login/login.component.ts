import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    public loading: boolean;
    user: any;

    constructor(private authService: AuthService) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.authService.user.subscribe(user => {
            this.user = user;
        });

        this.loading = false;
    }

    login(email, password) {
        this.authService.login(email, password);
    }

    logout() {
        this.authService.logout();
    }
}
