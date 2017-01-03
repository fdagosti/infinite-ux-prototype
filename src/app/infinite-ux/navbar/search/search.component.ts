import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/debounceTime";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {SearchService} from "./search.service";

@Component({
  selector: 'iux-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  private searching;
  private searchFailed;

  constructor(
    private search:SearchService,
    private router: Router) { }

  ngOnInit() {
  }

  valueSelected = (value:NgbTypeaheadSelectItemEvent) => {
    this.router.navigate(["/full/search", value.item.name.trim()]);
  }

  searchTerm = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.search.getSuggestions(term)
          .do((v) => {
            this.searchFailed = (v.length == 0 && term);
          })
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false);


  format = (value:any) =>{
    return value.name;
  }

}
