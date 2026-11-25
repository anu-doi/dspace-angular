import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyContentComponent as BaseComponent } from '../../../../../../app/info/privacy/privacy-content/privacy-content.component';

@Component({
  selector: 'ds-privacy-content',
  templateUrl: './privacy-content.component.html',
  styleUrls: ['./privacy-content.component.scss'],
  imports: [
    RouterLink,
    TranslateModule,
  ],
})
/**
 * Component displaying the contents of the Privacy Statement
 */
export class PrivacyContentComponent extends BaseComponent {
}
