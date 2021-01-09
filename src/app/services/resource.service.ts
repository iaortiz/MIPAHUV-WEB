import { Resource } from './../models/resources.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  isLoading = new BehaviorSubject<boolean>(false);
  loader = this.isLoading.asObservable();      // Observable para detectar cambios en el estado del boton
  collectionName = 'resources'
  resourcesCollection: AngularFirestoreCollection;
  resources: Observable<Resource[]>;
  resourceDoc: AngularFirestoreDocument;
  subscription: Subscription;
  uploadPercent: Observable<number>;
  event = {} as Event;
  urlFile: String;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
    //this.resources = this.db.collection('resources').valueChanges();
    this.resourcesCollection = this.db.collection(this.collectionName);
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Resource
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getResources() {
    return this.resources;
  }

  async addResource(resource: Resource) {
    this.resourcesCollection.add(resource).then(() => {
      this.isLoading.next(false);   // cambiamos el estado del observable
    });
  }


  deleteResource(resource: Resource) {
    this.resourceDoc = this.db.doc(`${this.collectionName}/${resource.id}`);
    this.resourceDoc.delete();
  }

  updateResource(resource: Resource) {
    this.resourceDoc = this.db.doc(`${this.collectionName}/${resource.id}`)
    this.resourceDoc.update(resource);
  }

  onUploadFile(resource: Resource, e: any) {
    this.isLoading.next(true);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    let filePath: string;
    (resource.category !== 'video') ? filePath = 'documents' : filePath = 'videos';

    filePath = `${filePath}/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe(urlFile => {
        resource.source = urlFile;
        this.addResource(resource);
      });
    })
    ).subscribe();
  }



}
