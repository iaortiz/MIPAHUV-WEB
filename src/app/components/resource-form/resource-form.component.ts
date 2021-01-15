import { Resource } from './../../models/resource.interface';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  resource = {} as Resource;
  types = ['video', 'documento']; // ... Agregar mas tipos
  type: string;
  files = [];
  event: any;

  constructor(public resourceService: ResourceService) { }

  ngOnInit() {
  };

  addResource() {
    this.resource.type = this.type;
    this.resourceService.onUploadFile(this.resource, this.event)
    this.resource = {} as Resource;
  }

  setEvent(e: any) {
    this.event = e;
  }


}
