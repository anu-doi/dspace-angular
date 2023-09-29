import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
// import { PublicationComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';
import { ItemComponent } from 'src/app/item-page/simple/item-types/shared/item.component';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Archive', ViewMode.StandalonePage, Context.Any, 'anu')
@Component({
  selector: 'ds-archive',
  styleUrls: ['./archive.component.scss'],
  // styleUrls: ['../../../../../../../app/item-page/simple/item-types/archive/archive.component.scss'],
  templateUrl: './archive.component.html',
  // templateUrl: '../../../../../../../app/item-page/simple/item-types/archive/archive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent extends ItemComponent {
}
