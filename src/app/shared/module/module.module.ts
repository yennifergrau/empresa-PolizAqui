import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from '../components/components.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ComponentsComponent
  ]
})
export class ModuleModule { }
