import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class MaterialModule { }
