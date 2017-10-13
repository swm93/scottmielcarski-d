import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BackgroundTextComponent } from './background-text.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BackgroundTextComponent],
  exports: [BackgroundTextComponent]
})
export class BackgroundTextModule { }
