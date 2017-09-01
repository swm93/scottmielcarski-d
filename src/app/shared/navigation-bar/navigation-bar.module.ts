import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavbarLinkComponent } from './navbar-link.component';



@NgModule({
  imports: [CommonModule],
  declarations: [NavbarComponent, NavbarLinkComponent],
  exports: [NavbarComponent, NavbarLinkComponent]
})
export class NavigationBarModule { }
