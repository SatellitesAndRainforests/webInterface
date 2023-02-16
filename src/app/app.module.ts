import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';


import { HomeComponent } from './pages/home/home.component';
import { WorldmapComponent } from './pages/worldmap/worldmap.component';
import { TablesComponent } from './pages/tables/tables.component';
import { NetworksComponent } from './pages/networks/networks.component';

import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { NetworkComponent } from './components/network/network.component';
import { DataComponent, DialogOpenComponent, DialogImageComponent } from './components/data/data.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddComponent, DialogComponent } from './components/add/add.component';
import { SliderComponent } from './components/slider/slider.component';
import { ReferencesComponent } from './components/references/references.component';
import { RefsComponent } from './pages/refs/refs.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    HomeComponent,
    WorldmapComponent,
    TablesComponent,
    NetworksComponent,
    NetworkComponent,
    DataComponent,
    HomepageComponent,
    AddComponent,
    DialogComponent,
    SliderComponent,
    ReferencesComponent,
    RefsComponent,
    DialogOpenComponent,
    DialogImageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule, 
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,

  ],
  entryComponents: [
    DialogComponent,
    DialogOpenComponent,
    DialogImageComponent, 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
