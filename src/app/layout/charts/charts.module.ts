import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'red',
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
    bgsType: SPINNER.rectangleBounce, // background spinner type
    fgsType: SPINNER.chasingDots, // foreground spinner type
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5, // progress bar thickness
  };

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule,NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
