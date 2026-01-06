import { Component, Input } from '@angular/core';
import { ThemedComponent } from '../../../../../shared/theme-support/themed.component';
import { Item } from '../../../../../core/shared/item.model';
import { ItemPageAbstractFieldComponent } from './item-page-abstract-field.component';

/**
 * Themed wrapper for {@link ItemPageTitleFieldComponent}
 */
@Component({
  selector: 'ds-themed-item-page-abstract-field',
  styleUrls: [],
  templateUrl: '../../../../../shared/theme-support/themed.component.html',
})
export class ThemedItemPageAbstractFieldComponent extends ThemedComponent<ItemPageAbstractFieldComponent> {

  protected inAndOutputNames: (keyof ItemPageAbstractFieldComponent & keyof this)[] = [
    'item',
  ];

  @Input() item: Item;

  protected getComponentName(): string {
    return 'ItemPageAbstractFieldComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../../../themes/${themeName}/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./item-page-abstract-field.component');
  }
}
