import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteIntentComponent } from './delete-intent.component';

const routes: Routes = [
    {
        path: '',
        component: DeleteIntentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeleteIntentRoutingModule {}
