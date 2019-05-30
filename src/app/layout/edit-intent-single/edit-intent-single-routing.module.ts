import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditIntentSingleComponent } from './edit-intent-single.component';

const routes: Routes = [
    {
        path: '',
        component: EditIntentSingleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditIntentSingleRoutingModule {}
