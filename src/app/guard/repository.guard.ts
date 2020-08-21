import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RepositoryModel } from '../models/repository.model';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Injectable()

export class RepositoryGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isEmptyData = Object.keys(this.dataService.getValue() as RepositoryModel).length === 0;
    return isEmptyData ? this.router.navigate(['/search']) : true;
  }

}
