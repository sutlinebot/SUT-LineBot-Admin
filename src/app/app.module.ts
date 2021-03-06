import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AdminComponent } from './admin/admin.component';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from 'ng4-social-login';

import { HomeComponent } from './home/home.component';
import { AddIntentComponent } from './add-intent/add-intent.component';
import { DelIntentComponent } from './del-intent/del-intent.component';
import { HeaderComponent } from './header/header.component';
import { TrainingComponent } from './training/training.component';
import { IntentComponent } from './intent/intent.component';
import { EditIntentComponent } from './edit-intent/edit-intent.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { EditIntentSingleComponent } from './edit-intent-single/edit-intent-single.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './chart/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { RadarChartComponent } from './chart/radar-chart/radar-chart.component';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared';
import { NgxUiLoaderModule } from  'ngx-ui-loader';


const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('425053466223-2djus2r480pa4l57ge3m5kkvt7a3g5fr.apps.googleusercontent.com')
  },
], false);

export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    AddIntentComponent,
    DelIntentComponent,
    HeaderComponent,
    TrainingComponent,
    IntentComponent,
    EditIntentComponent,
    LeftMenuComponent,
    EditIntentSingleComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    RadarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule ,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    NgxUiLoaderModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
