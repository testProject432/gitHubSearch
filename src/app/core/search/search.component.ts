import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { iif, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { RepositoryModel } from '../../models/repository.model';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  title = 'GitHub search repositories';
  loading$: Observable<boolean> = this.apiService.loading$;
  repository: RepositoryModel;

  searchForm = new FormGroup({
    query: new FormControl(''),
    archived: new FormControl(false),
    hasWiki: new FormControl(false),
  });

  get formValue(): any {
    return (this.searchForm as FormGroup).value;
  }

  searchResults$: Observable<Array<RepositoryModel>>;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.searchResults$ = this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(({query}) =>
          iif(() => query.trim().length >= 1,
            this.apiService.getRepository(query),
            of(null))
        ),
        map(response => response ? this.filterApplyHandler(response) : response),
      );
  }

  private filterApplyHandler(repo: Array<RepositoryModel>): Array<RepositoryModel> {
    const {archived, hasWiki} = this.formValue;
    if (!archived && !hasWiki) {
      return repo;
    }
    return repo.reduce((acc, value) => {
      if (archived && hasWiki) {
        return value.archived === archived && value.has_wiki === hasWiki ? acc.concat(value) : acc;
      } else if (hasWiki) {
        return value.has_wiki === true ? acc.concat(value) : acc;
      } else {
        return value.archived === true ? acc.concat(value) : acc;
      }
    }, []);
  }

  testMethod(repository: RepositoryModel): void {
    this.dataService.currentRepo(repository);
    this.router.navigate(['/repository']);
  }
}
