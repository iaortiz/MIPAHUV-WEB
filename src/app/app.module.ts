import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ResourceComponent } from './components/resource/resource.component'
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    ResourceFormComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
