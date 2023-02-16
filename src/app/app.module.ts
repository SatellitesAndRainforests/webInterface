import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MapComponent } from './modules/map/map.component';
import { HeaderComponent } from './modules/header/header.component';

import { HomeComponent } from './pages/home/home.component';
import { DataComponent } from './modules/data/data.component';
import { NewCaptureFormComponent } from './modules/new-capture-form/new-capture-form.component';
import { NewCaptureComponent } from './pages/new-capture/new-capture.component';
import { ExpeditionsComponent } from './modules/expeditions/expeditions.component';
import { NetworkComponent } from './modules/network/network.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    HomeComponent,
    DataComponent,
    NewCaptureFormComponent,
    NewCaptureComponent,
    ExpeditionsComponent,
    NetworkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
