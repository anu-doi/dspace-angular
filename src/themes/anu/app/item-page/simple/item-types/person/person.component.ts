import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { PersonComponent as BaseComponent } from '../../../../../../../app/entity-groups/research-entities/item-pages/person/person.component';


@listableObjectComponent('Person', ViewMode.StandalonePage, Context.Any, 'anu')
@Component({
  selector: 'ds-person',
  // styleUrls: ['./person.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/person/person.component.scss'],
  templateUrl: './person.component.html',
  // templateUrl: '../../../../../../../app/entity-groups/research-entities/item-pages/person/person.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * The component for displaying metadata and relations of an item of the type Person
 */
export class PersonComponent extends BaseComponent {
}
