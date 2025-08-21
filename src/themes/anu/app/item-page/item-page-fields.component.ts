import {  Component, Input } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { ItemComponent } from 'src/app/item-page/simple/item-types/shared/item.component';

/**
 * This component renders a simple item page.
 * The route parameter 'id' is used to request the item it represents.
 * All fields of the item that should be displayed, are defined in its template.
 */
@Component({
  selector: 'ds-item-page-fields',
  // styleUrls: ['./item-page.component.scss'],
//   styleUrls: ['../../../../../app/item-page/simple/item-page.component.scss'],
  templateUrl: './item-page-fields.component.html',
//   templateUrl: '../../../../../app/item-page/item-page-fields.component.html',
})
export class ItemPageFieldsComponent extends ItemComponent {
    @Input() object: Item;
}
