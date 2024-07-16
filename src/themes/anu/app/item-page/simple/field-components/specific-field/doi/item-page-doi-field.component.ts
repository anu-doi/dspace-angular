import { Component, Input } from '@angular/core';

import { Item } from 'src/app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';
// import { MetadataValue } from 'src/app/core/shared/metadata.models';
//import { ItemPageAbstractFieldComponent as BaseComponent} from 'src/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';

@Component({
    selector: 'ds-item-page-doi-field',
    templateUrl: './item-page-doi-field.component.html',
 //   styleUrls: ['./item-page-doi-field.component.scss'],
    // templateUrl: '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component.html'
})
/**
 * This component is used for displaying the abstract (dc.description.abstract) of an item
 */
// export class ItemPageDOIFieldComponent extends ItemPageFieldComponent {
export class ItemPageDOIFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;
}
