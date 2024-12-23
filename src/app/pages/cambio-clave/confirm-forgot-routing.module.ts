import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmForgotPage } from './confirm-forgot.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmForgotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmForgotPageRoutingModule {}
