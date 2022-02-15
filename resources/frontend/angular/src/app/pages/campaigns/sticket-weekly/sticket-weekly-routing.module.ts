import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SticketWeeklyComponent } from './sticket-weekly.component';

const routes: Routes = [
  {
    path: '',
    component: SticketWeeklyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SticketWeeklyRoutingModule {
}
