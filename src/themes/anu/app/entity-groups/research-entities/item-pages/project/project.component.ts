import { Component } from '@angular/core';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import {
  ProjectComponent as BaseComponent
} from '../../../../../../../app/entity-groups/research-entities/item-pages/project/project.component';
import { Context } from 'src/app/core/shared/context.model';

@listableObjectComponent('Project', ViewMode.StandalonePage, Context.Any, "anu")
@Component({
  selector: 'ds-project',
  // styleUrls: ['./project.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/project/project.component.scss'],
  templateUrl: './project.component.html'
})
/**
 * The component for displaying metadata and relations of an item of the type Project
 */
export class ProjectComponent extends BaseComponent {
}
