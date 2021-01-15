import { Subscription } from 'rxjs';
import { ResourceFormComponent } from './../resource-form/resource-form.component';
import { Resource } from './../../models/resources.interface';
import { ResourceService } from './../../services/resource.service';
import { Component, TemplateRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  subscription: Subscription;
  modalRef: BsModalRef;
  resources = [];
  editingResource: Resource;
  resource: Resource;

  constructor(private modalService: BsModalService, public resourceService: ResourceService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.resourceService.getResources().subscribe(resources => {
      this.resources = resources
    });
  }

  deleteResource() {
    this.resourceService.deleteResource(this.resource);
  }

  openModal(template: TemplateRef<any>, resource: Resource) {
    this.resource = resource;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openModalResource(resource: Resource) {
    let title = 'Añadir'
    if (resource.id) title = 'Editar';
    const initialState = {
      resource
    }
    this.modalRef = this.modalService.show(ResourceFormComponent, { class: 'modal-lg', initialState });
    this.modalRef.content.title = title;
    this.modalRef.content.cancel.subscribe(resource => {
      this.ngOnInit();
    });
  }

  confirm(): void {
    this.deleteResource();
    this.modalRef.hide();
  }
}
