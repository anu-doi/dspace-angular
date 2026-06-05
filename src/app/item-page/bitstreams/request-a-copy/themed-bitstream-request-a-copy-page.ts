import { Component } from '@angular/core';
import { ThemedComponent } from '../../../shared/theme-support/themed.component';
import { BitstreamRequestACopyPageComponent } from './bitstream-request-a-copy-page.component';

@Component({
  selector: 'ds-themed-bitstream-request-a-copy-page',
  styleUrls: [],
  templateUrl: '../../../shared/theme-support/themed.component.html',
})

export class ThemedBitstreamRequestACopyPageComponent extends ThemedComponent<BitstreamRequestACopyPageComponent> {
  protected getComponentName(): string {
    return 'BitstreamRequestACopyPageComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../themes/${themeName}/app/item-page/bitstreams/request-a-copy/bitstream-request-a-copy-page.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./bitstream-request-a-copy-page.component`);
  }

}
