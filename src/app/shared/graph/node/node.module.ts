import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NodeComponent } from './node.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NodeComponent],
  exports: [NodeComponent]
})
export class NodeModule { }
