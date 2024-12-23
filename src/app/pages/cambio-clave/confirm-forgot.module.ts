import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmForgotPageRoutingModule } from './confirm-forgot-routing.module';

import { ConfirmForgotPage } from './confirm-forgot.page';
import { ModuleModule } from 'src/app/shared/module/module.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmForgotPageRoutingModule,
    ReactiveFormsModule,
    ModuleModule,
    HttpClientModule
  ],
  declarations: [ConfirmForgotPage]
})
export class ConfirmForgotPageModule {}
