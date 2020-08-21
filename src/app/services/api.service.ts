import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { RepositoryModel } from '../models/repository.model';

const URL = 'https://api.github.com/search/repositories?q=';

interface IResults {
  total_count: number;
  incomplete_results: boolean;
  items: Array<RepositoryModel>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly loading = new Subject<boolean>();

  get loading$(): Observable<boolean> {
    return this.loading;
  }

  constructor(private http: HttpClient) {}

  getRepository(q: string): any {
    return this.http.get<IResults>(`${URL}${q}`)
    .pipe(
      tap(() => this.loading.next(true)),
      delay(1000),
      map((res) => {
        this.loading.next(false);
        return res.items;
      }),
      catchError((err) => {
        this.loading.next(false);
        return of([{ login: 'Error from server' }]);
      })
    );
  }

}
