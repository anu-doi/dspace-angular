import { Component, Input } from '@angular/core';

import { Item } from 'src/app/core/shared/item.model';
import { MetadataValue } from 'src/app/core/shared/metadata.models';
import { ItemPageAbstractFieldComponent as BaseComponent} from 'src/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';

@Component({
    selector: 'ds-item-page-abstract-field',
    templateUrl: './item-page-abstract-field.component.html',
    styleUrls: ['./item-page-abstract-field.component.scss'],
    // templateUrl: '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component.html'
})
/**
 * This component is used for displaying the abstract (dc.description.abstract) of an item
 */
export class ItemPageAbstractFieldComponent extends BaseComponent {

    /**
     * The item to display metadata for
     */
    @Input() item: Item;

    mdValues: MetadataValue[];

    abstractMetadata: String;

    hideIfNoTextContent: Boolean = false;

    getAbstractMetadata(item): String {
        this.mdValues = item.allMetadata('dc.description.abstract');
        if(this.mdValues.length == 0){
            this.hideIfNoTextContent = true;
        } else {
            this.abstractMetadata = this.mdValues[0].value;
        }
        return this.abstractMetadata;
    }
}
