import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablesComponent } from './pages/tables/tables.component';
import { HomeComponent } from './pages/home/home.component';
import { WorldmapComponent } from './pages/worldmap/worldmap.component';
import { NetworksComponent } from './pages/networks/networks.component';
import { RefsComponent } from './pages/refs/refs.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'worldmap', component: WorldmapComponent },
  { path: 'networks', component: NetworksComponent },
  { path: 'refs', component: RefsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
