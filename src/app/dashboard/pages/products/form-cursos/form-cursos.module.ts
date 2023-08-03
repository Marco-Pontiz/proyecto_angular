import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCursosComponent } from './form-cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormCursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FormCursosComponent
  ]
})
export class FormCursosModule { }
