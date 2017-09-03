import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card.component';
import { CardBodyComponent } from './body/card-body.component';
import { CardFooterComponent } from './footer/card-footer.component';
import { CardHeaderComponent } from './header/card-header.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
  exports: [CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent]
})
export class CardModule { }
