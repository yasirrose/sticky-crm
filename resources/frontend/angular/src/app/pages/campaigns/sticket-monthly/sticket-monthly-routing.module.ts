import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SticketMonthlyComponent } from './sticket-monthly.component';

const routes: Routes = [
  {
    path: '',
    component: SticketMonthlyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SticketMonthlyRoutingModule {
}
