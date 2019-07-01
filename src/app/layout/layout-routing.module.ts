import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'charts', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'training', loadChildren: './training/training.module#TrainingModule' },
            { path: 'add-intent', loadChildren: './add-intent/add-intent.module#AddIntentModule' },
            { path: 'chat', loadChildren: './chat-bot/chat-bot.module#ChatBotModule' },
            { path: 'edit-intent', loadChildren: './edit-intent/edit-intent.module#EditIntentModule' },
            { path: 'edit-single', loadChildren: './edit-intent-single/edit-intent-single.module#EditIntentSingleModule' },
            { path: 'delete-intent', loadChildren: './delete-intent/delete-intent.module#DeleteIntentModule' },
            { path: 'photos', loadChildren: './photos/photos.module#PhotosModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
