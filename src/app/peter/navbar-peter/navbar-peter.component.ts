import { Component, OnInit, HostListener, Inject} from '@angular/core';
import {AuthenticationService} from "../../authentication.service";
import { DOCUMENT } from "@angular/platform-browser";


@Component({
	selector: 'iux-navbar-peter',
	templateUrl: './navbar-peter.component.html',
	styleUrls: ['./navbar-peter.component.css']
})
export class NavbarPeterComponent implements OnInit {
	private isAtTop: boolean = true;
	// constructor() { }
	constructor(@Inject(DOCUMENT) private document: Document) { }
	ngOnInit() {
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		let number = this.document.body.scrollTop;
		if (number == 0 ) {
			this.isAtTop = true;
			console.log('Top');

		} else {
			this.isAtTop = false;
			console.log('y = ' + number);		}
		}
	}
