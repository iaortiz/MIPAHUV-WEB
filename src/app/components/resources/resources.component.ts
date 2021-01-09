import { ResourceFormComponent } from './../resource-form/resource-form.component';
import { Resource } from './../../models/resources.interface';
import { ResourceService } from './../../services/resource.service';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  modalRef: BsModalRef;
  resources = [];
  editingResource: Resource;
  resource: Resource;

  constructor(private modalService: BsModalService, public resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(resources => {
      this.resources = resources
    });
  }

  deleteResource() {
    this.resourceService.deleteResource(this.resource);
  }

  updateResource() {
    this.resourceService.updateResource(this.editingResource);
    this.editingResource = {} as Resource;

  }
  openModal(template: TemplateRef<any>, resource: Resource) {
    this.resource = resource;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModalResource() {
    this.modalRef = this.modalService.show(ResourceFormComponent, { class: 'modal-lg' });
  }

  confirm(): void {
    this.deleteResource();
    this.modalRef.hide();
  }
}
