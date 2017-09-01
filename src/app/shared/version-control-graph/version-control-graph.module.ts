import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GraphComponent } from './graph.component';
import { CommitComponent } from './commit.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GraphComponent, CommitComponent],
  exports: [GraphComponent, CommitComponent]
})
export class VersionControlGraphModule { }
