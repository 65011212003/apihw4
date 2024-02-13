import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail/:imdbID', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
