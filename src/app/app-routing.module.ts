import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddIntentComponent } from './add-intent/add-intent.component';
import { DelIntentComponent } from './del-intent/del-intent.component';
import { TrainingComponent } from './training/training.component';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';
import { IntentComponent } from './intent/intent.component';
import { EditIntentComponent } from './edit-intent/edit-intent.component';
import { EditIntentSingleComponent } from './edit-intent-single/edit-intent-single.component';
import { DoughnutChartComponent } from './chart/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './chart/radar-chart/radar-chart.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'administrator', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-intent', component: AddIntentComponent },
  { path: 'del-intent', component: DelIntentComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'chatbot', component: ChatDialogComponent },
  { path: 'intent', component: IntentComponent },
  { path: 'edit', component: EditIntentComponent },
  { path: 'bar-chart', component: BarChartComponent},
  { path: 'rader-chart', component: RadarChartComponent},
  { path: 'doughnut-chart', component: DoughnutChartComponent},
  { path: 'pie-chart', component: PieChartComponent},
  { path: 'edit-single', component: EditIntentSingleComponent, data: { animation: 'heroes' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
