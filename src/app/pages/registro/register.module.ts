import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { HttpClientModule } from '@angular/common/http';
import { MaskDirective } from 'src/app/utils/mask.directive';
import { ModuleModule } from 'src/app/shared/module/module.module';
import { RifMaskDirective } from 'src/app/utils/mask-rif.directive';
import { UpperCaseInputDirective } from 'src/app/utils/upper-case-input.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModuleModule
  ],
  declarations: [RegisterPage,MaskDirective,RifMaskDirective,UpperCaseInputDirective]
})
export class RegisterPageModule {}
