import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormulaComponent } from './create-formula.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFormulaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFormulaRoutingModule {
}
