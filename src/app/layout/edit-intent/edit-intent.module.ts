import { NgModule } from '@angular/core';

import { EditIntentRoutingModule } from './edit-intent-routing.module';
import { EditIntentComponent } from './edit-intent.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ EditIntentRoutingModule,CommonModule ],
    declarations: [EditIntentComponent]
})
export class EditIntentModule {}
