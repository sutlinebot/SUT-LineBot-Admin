import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriningRoutingModule } from './training-routing.module'
import { TrainingComponent } from './training.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    imports: [
        CommonModule, 
        TriningRoutingModule,
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
    ],
    declarations: [TrainingComponent]
})
export class TrainingModule {}
