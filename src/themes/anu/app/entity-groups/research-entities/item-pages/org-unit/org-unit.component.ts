import { Component } from '@angular/core';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { OrgUnitComponent as BaseComponent } from 'src/app/entity-groups/research-entities/item-pages/org-unit/org-unit.component';
import { Context } from 'src/app/core/shared/context.model';

@listableObjectComponent('OrgUnit', ViewMode.StandalonePage, Context.Any, "anu")
@Component({
  selector: 'ds-org-unit',
  // styleUrls: ['./org-unit.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/org-unit/org-unit.component.scss'],
  templateUrl: './org-unit.component.html'
})
/**
 * The component for displaying metadata and relations of an item of the type Organisation Unit
 */
export class OrgUnitComponent extends BaseComponent {
}
