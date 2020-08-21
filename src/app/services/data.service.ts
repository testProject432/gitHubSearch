import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepositoryModel } from '../models/repository.model';

@Injectable()
export class DataService {
  private repo = new BehaviorSubject<RepositoryModel>({} as RepositoryModel);
  public currentRepo$ = this.repo.asObservable();

  currentRepo(repository: RepositoryModel): void {
    this.repo.next(repository);
  }

  public getValue(): RepositoryModel {
    return this.repo.getValue();
  }

}
