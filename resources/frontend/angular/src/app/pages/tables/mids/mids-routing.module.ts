import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MidsComponent } from './mids.component';

const routes: Routes = [
  {
    path: '',
    component: MidsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MidsRoutingModule {
}
