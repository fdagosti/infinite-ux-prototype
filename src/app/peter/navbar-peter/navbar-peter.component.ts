import { Component, OnInit } from '@angular/core';
// import {AuthenticationService} from "../../authentication.service";

@Component({
	selector: 'iux-navbar-peter',
	templateUrl: './navbar-peter.component.html',
	styleUrls: ['./navbar-peter.component.css']
})
export class NavbarPeterComponent implements OnInit {
	private currentlyLoggedIn;

	// constructor(private auth: AuthenticationService) { }

	ngOnInit() {
		// this.auth.loginStateChanged$.subscribe(login => this.currentlyLoggedIn = this.auth.isLoggedIn());
		// this.currentlyLoggedIn = this.auth.isLoggedIn();
	}
}
