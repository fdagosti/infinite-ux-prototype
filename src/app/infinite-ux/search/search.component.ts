import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/debounceTime";
import {CtapService} from "../../ctap.service";

@Component({
  selector: 'iux-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searching;
  private searchFailed;

  constructor(private ctap:CtapService) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.ctap.getSuggestions(term)
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
