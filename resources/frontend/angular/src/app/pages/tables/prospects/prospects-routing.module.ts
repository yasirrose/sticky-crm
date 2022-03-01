import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectsComponent } from './prospects.component';

const routes: Routes = [
  {
    path: '',
    component: ProspectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectsRoutingModule {
}
