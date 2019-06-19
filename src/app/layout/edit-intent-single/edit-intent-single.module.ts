import { NgModule } from '@angular/core';

import { EditIntentSingleRoutingModule } from './edit-intent-single-routing.module';
import { EditIntentSingleComponent } from './edit-intent-single.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        FormsModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
        EditIntentSingleRoutingModule,
        TypeaheadModule
        
    ],
    declarations: [EditIntentSingleComponent]
})
export class EditIntentSingleModule {}
