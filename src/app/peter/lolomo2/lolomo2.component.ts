import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'iux-lolomo2',
	templateUrl: './lolomo2.component.html',
	styleUrls: ['./lolomo2.component.css']
})
export class Lolomo2Component implements OnInit {


	@Input() index;
	constructor() { }
	ngOnInit() {
	}

}
