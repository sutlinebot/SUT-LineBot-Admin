import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddIntentComponent } from './add-intent/add-intent.component';
import { DelIntentComponent } from './del-intent/del-intent.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'administrator', component: AdminComponent },
  { path: 'home', component: HomeComponent},
  { path: 'add-intent', component: AddIntentComponent},
  { path: 'del-intent', component: DelIntentComponent},
  { path: 'training', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
