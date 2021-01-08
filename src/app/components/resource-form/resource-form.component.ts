import { ResourceService } from './../../services/resource.service';
import { Resource } from './../../models/resources.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  @ViewChild('resources', { static: false }) resourceModal: ModalDirective;
  modalRef: BsModalRef;

  resource = {} as Resource;
  categories = ['video', 'documento']; // ... Agregar mas tipos
  subjects = ['Programacion avanzada', 'Ingenieria de requisitos', 'Gestion de Proyectos']
  files = [];
  event: any;

  constructor(private modalService: BsModalService, public resourceService: ResourceService) { }

  addResource() {
    console.log(this.resource);
    this.resourceService.onUploadFile(this.resource, this.event)
    this.resource = {} as Resource;
  }

  setEvent(e: any) {
    this.event = e;
  }

  openModal() {
    this.resourceModal.show();
  }
  closeModal() {
    console.log("listo");
    this.resourceModal.hide();
  }

  ngOnInit() {
  }

}
