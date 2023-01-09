import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewCaptureComponent } from './pages/new-capture/new-capture.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new-capture', component: NewCaptureComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
