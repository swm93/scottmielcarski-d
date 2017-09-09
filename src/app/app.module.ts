import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DevelopmentComponent } from './development/development.component';
import { PhotographyComponent } from './photography/photography.component';
import { ResumeComponent } from './resume/resume.component';

import { CardModule } from './shared/card/card.module';
import { NavigationBarModule } from './shared/navigation-bar/navigation-bar.module';
import { VersionControlGraphModule } from './shared/version-control-graph/version-control-graph.module';

import { DatabaseService } from './shared/database/database-service'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DevelopmentComponent,
    PhotographyComponent,
    ResumeComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    CardModule,
    NavigationBarModule,
    VersionControlGraphModule
  ],
  providers: [
    DatabaseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
