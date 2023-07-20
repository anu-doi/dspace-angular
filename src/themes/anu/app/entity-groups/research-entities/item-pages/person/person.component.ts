import { Component } from '@angular/core';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { PersonComponent as BaseComponent } from 'src/app/entity-groups/research-entities/item-pages/person/person.component';
import { Context } from 'src/app/core/shared/context.model';

@listableObjectComponent('Person', ViewMode.StandalonePage, Context.Any, "anu")
@Component({
  selector: 'ds-person',
  // styleUrls: ['./person.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/person/person.component.scss'],
  templateUrl: './person.component.html'
})
/**
 * The component for displaying metadata and relations of an item of the type Person
 */
export class PersonComponent extends BaseComponent {
}
