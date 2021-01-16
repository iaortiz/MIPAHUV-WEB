import { Resource } from './../../models/resource.interface';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {


  resources = [];
  editingResource: Resource;

  constructor(public resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(resources => {
      this.resources = resources
    });
  }

  deleteResource(event, resource) {
    this.resourceService.deleteResource(resource);
  }

  updateResource() {
    this.resourceService.updateResource(this.editingResource);
    this.editingResource = {} as Resource;

  }

}
