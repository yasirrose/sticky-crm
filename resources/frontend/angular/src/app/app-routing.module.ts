import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        pathMatch: 'full'
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'customer-detail',
        loadChildren: () => import('./pages/customers/customer-detail/customer-detail.module').then(m => m.CustomerDetailModule),
      },
      {
        path: 'tables/all-in-one-table',
        loadChildren: () => import('./pages/tables/all-in-one-table/all-in-one-table.module').then(m => m.AllInOneTableModule),
      },
      {
        path: 'tables/orders',
        loadChildren: () => import('./pages/tables/orders/orders.module').then(m => m.OrdersModule),
      },
      {
        path: 'orders/product-detail',
        loadChildren: () => import('./pages/tables/orders/product-detail/product-detail.module').then(m => m.ProductDetailModule),
      },
      {
        path: 'view/formulas',
        loadChildren: () => import('./pages/view-formulas/view-formulas.module').then(m => m.ViewFormulasModule),
      },
      {
        path: 'create/formula',
        loadChildren: () => import('./pages/create-formula/create-formula.module').then(m => m.CreateFormulaModule),
      },
      {
        path: 'campaigns/golden-ticket',
        loadChildren: () => import('./pages/campaigns/golden-ticket/golden-ticket.module').then(m => m.GoldenTicketModule),
      },
      {
        path: 'campaigns/sticket-daily',
        loadChildren: () => import('./pages/campaigns/sticket-daily/sticket-daily.module').then(m => m.SticketDailyModule),
      },
      {
        path: 'campaigns/sticket-weekly',
        loadChildren: () => import('./pages/campaigns/sticket-weekly/sticket-weekly.module').then(m => m.SticketWeeklyModule),
      },
      {
        path: 'campaigns/sticket-monthly',
        loadChildren: () => import('./pages/campaigns/sticket-monthly/sticket-monthly.module').then(m => m.SticketMonthlyModule),
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
