import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFormulasComponent } from './view-formulas.component';

const routes: Routes = [
  {
    path: '',
    component: ViewFormulasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFormulasRoutingModule {
}
