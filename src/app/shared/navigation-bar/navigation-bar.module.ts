import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { NavbarLinkComponent } from './navigation-bar-link/navbar-link.component';
import { NavbarGroupComponent } from './navigation-bar-group/navbar-group.component';



@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent, NavbarLinkComponent, NavbarGroupComponent],
  exports: [NavbarComponent, NavbarLinkComponent, NavbarGroupComponent]
})
export class NavigationBarModule { }
