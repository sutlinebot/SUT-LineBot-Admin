import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DeleteIntentRoutingModule } from './delete-intent-routing.module';
import { DeleteIntentComponent } from './delete-intent.component';

@NgModule({
    imports: [CommonModule, DeleteIntentRoutingModule, FormsModule],
    declarations: [DeleteIntentComponent]
})
export class DeleteIntentModule {}
