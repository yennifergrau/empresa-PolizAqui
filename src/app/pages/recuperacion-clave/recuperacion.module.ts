import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperacionPageRoutingModule } from './recuperacion-routing.module';

import { RecuperacionPage } from './recuperacion.page';
import { HttpClientModule } from '@angular/common/http';
import { ModuleModule } from 'src/app/shared/module/module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacionPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModuleModule
  ],
  declarations: [RecuperacionPage]
})
export class RecuperacionPageModule {}
