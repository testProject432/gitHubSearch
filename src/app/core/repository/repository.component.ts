import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { RepositoryModel } from '../../models/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  public repository$: Observable<RepositoryModel>;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.repository$ = this.dataService.currentRepo$;
  }

}
