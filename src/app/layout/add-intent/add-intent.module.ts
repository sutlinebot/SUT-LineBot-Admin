import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddIntentRoutingModule } from './add-intent-routing.module';
import { AddIntentComponent } from './add-intent.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PageHeaderModule } from '../../shared';
import { EditIntentComponent } from '../edit-intent/edit-intent.component';


@NgModule({
    imports: [
        CommonModule,
        AddIntentRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ButtonsModule.forRoot(),
        TypeaheadModule.forRoot(),
        PageHeaderModule
    ],
    declarations: [AddIntentComponent,EditIntentComponent]
})
export class AddIntentModule {}
