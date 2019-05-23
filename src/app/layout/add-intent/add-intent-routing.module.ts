import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIntentComponent } from './add-intent.component';

const routes: Routes = [
    {
        path: '',
        component: AddIntentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddIntentRoutingModule {}
