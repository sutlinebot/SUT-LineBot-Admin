import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    modalRef: BsModalRef;

    private urls: string[] = [""];

    ngOnInit() {
        this.items.subscribe(
            data => {
                data.forEach(el => {
                    this.urls.push(
                        el.url
                    )
                });
            }
        );
    }
    constructor(private storage: AngularFireStorage, public db: AngularFireDatabase, private modalService: BsModalService) {
        this.itemsRef = db.list('photos');
        this.items = this.itemsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );


    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    copy(text) {
        text.select();
        document.execCommand('copy');
        text.setSelectionRange(0, 0);
    }

    delImg(data){
        
        this.itemsRef.remove(data.key);
        this.modalRef.hide();
    }
    uploadFile(event) {
        const file = event.target.files[0];
        const filePath = `photos/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => {
                this.downloadURL = fileRef.getDownloadURL()
                this.downloadURL.subscribe(
                    (val) => {
                        this.itemsRef.push({ url: val });
                    }
                )

            })
        )
            .subscribe()
    }
}
