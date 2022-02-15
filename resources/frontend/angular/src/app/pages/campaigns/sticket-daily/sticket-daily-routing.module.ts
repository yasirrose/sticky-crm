import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SticketDailyComponent } from './sticket-daily.component';

const routes: Routes = [
  {
    path: '',
    component: SticketDailyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SticketDailyRoutingModule {
}
