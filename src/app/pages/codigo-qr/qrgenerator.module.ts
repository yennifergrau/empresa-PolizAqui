import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrgeneratorPageRoutingModule } from './qrgenerator-routing.module';

import { QrgeneratorPage } from './qrgenerator.page';
import { HttpClientModule } from '@angular/common/http';
import { QrcodeService } from 'src/app/services/generarCodigo.service';
import { ModuleModule } from 'src/app/shared/module/module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgeneratorPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModuleModule
  ],
  providers:[QrcodeService],
  declarations: [QrgeneratorPage]
})
export class QrgeneratorPageModule {}
