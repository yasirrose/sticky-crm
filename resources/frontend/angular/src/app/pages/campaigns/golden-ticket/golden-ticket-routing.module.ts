import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldenTicketComponent } from './golden-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: GoldenTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldenTicketRoutingModule {
}
