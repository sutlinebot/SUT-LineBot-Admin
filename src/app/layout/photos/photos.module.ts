import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        PhotosRoutingModule,
        AngularFireStorageModule,
        ModalModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
    ],
    declarations: [PhotosComponent],
    providers: [
        { provide: StorageBucket, useValue: 'gs://botframe-2d07e.appspot.com' }
    ]
})
export class PhotosModule {}
