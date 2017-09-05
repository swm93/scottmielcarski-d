import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PhotographyComponent } from './photography/photography.component';
import { DevelopmentComponent } from './development/development.component';
import { ResumeComponent } from './resume/resume.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'development', component: DevelopmentComponent },
  { path: 'photography', component: PhotographyComponent },
  { path: 'resume', component: ResumeComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
