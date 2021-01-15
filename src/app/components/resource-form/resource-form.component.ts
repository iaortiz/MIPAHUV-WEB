import { Subscription } from 'rxjs';
import { ResourceService } from './../../services/resource.service';
import { Resource } from './../../models/resources.interface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  @ViewChild('resources', { static: false }) resourceModal: ModalDirective;
  @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;

  title: string;
  subscription: Subscription;
  isLoading = false;
  isUploadSuccessful = false;
  resource = {} as Resource;
  resourceCopy = {} as Resource;
  categories = ['video', 'documento']; // ... Agregar mas tipos
  subjects = ['Programacion avanzada', 'Ingenieria de requisitos', 'Gestion de Proyectos']
  files = [];
  event: any;
  error = false;
  uploadPercent = 0;
  cancel: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: BsModalService, public resourceService: ResourceService, public modalRef: BsModalRef) { }

  addResource() {
    this.isLoading = true;
    this.isUploadSuccessful = false;
    this.resourceService.onUploadFile(this.resource, this.event);
    this.resourceService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.isUploadSuccessful = !isLoading;
      if (this.isUploadSuccessful) {
        this.resource = {} as Resource;
        this.reset(); // Eliminar el archivo de el input
      }
    })
    this.resourceService.uploadPercent.subscribe(uploadPercent => {
      this.uploadPercent = uploadPercent;
    })
  }

  setEvent(e: any) {
    this.event = e;
  }

  deleteResource() {
    delete this.resource.source;
  }

  reset() {
    if (this.resource.id) {
      this.myInputVariable.nativeElement.value = '';
    }
  }

  ngOnInit() {
    this.resourceCopy = this.resource;
  }

  closeModal() {
    this.cancel.emit(this.resourceCopy);
    this.modalRef.hide();
  }
}
