import { Component } from '@angular/core';

import { PrivacyContentComponent } from './privacy-content/privacy-content.component';
import { PrivacyComponent as BaseComponent } from '../../../../../app/info/privacy/privacy.component';


@Component({
  selector: 'ds-base-privacy',
  // templateUrl: './privacy.component.html',
  templateUrl: '../../../../../app/info/privacy/privacy.component.html',
  styleUrls: ['../../../../../app/info/privacy/privacy.component.scss'],
  imports: [
    PrivacyContentComponent,
  ],
})
/**
 * Component displaying the Privacy Statement
 */
export class PrivacyComponent extends BaseComponent {
}
