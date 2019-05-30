import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditIntentComponent } from './edit-intent.component';


const routes: Routes = [
    {
        path: '',
        component: EditIntentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        
    ],
    exports: [RouterModule]
})
export class EditIntentRoutingModule {}
