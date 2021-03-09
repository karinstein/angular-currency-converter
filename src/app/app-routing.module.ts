import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  { path: '', redirectTo: '/currency-converter', pathMatch: 'full' },
  { path: 'currency-converter', component: CurrencyComponent },
  { path: 'currency-list', component: CurrencyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
