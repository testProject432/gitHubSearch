import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchComponent } from './core/search/search.component';
import { RepositoryComponent } from './core/repository/repository.component';
import { RepositoryGuard } from './guard/repository.guard';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'repository', component: RepositoryComponent, canActivate: [RepositoryGuard]},
  {path: '**', redirectTo: '/search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RepositoryGuard]
})
export class AppRoutingModule {
}
