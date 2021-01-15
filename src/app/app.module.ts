import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ResourceFormComponent,
    ResourcesComponent
  ],
  imports: [
    NgbModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,

  ],
  entryComponents: [ResourceFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
