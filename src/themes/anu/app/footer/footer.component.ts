import {
  AsyncPipe,
  DatePipe,
} from '@angular/common';
import { Component, DOCUMENT, Inject, OnInit, Optional } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownViewerComponent } from 'src/app/shared/markdown-viewer/markdown-viewer.component';

import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { environment } from 'src/environments/environment';
import { OrejimeService } from '@dspace/core/cookies/orejime.service';
import { AuthorizationDataService } from '@dspace/core/data/feature-authorization/authorization-data.service';
import { NotifyInfoService } from '@dspace/core/coar-notify/notify-info/notify-info.service';
import { APP_CONFIG, AppConfig } from '@dspace/config/app-config.interface';
import { SiteDataService } from '@dspace/core/data/site-data.service';
import { LocaleService } from '@dspace/core/locale/locale.service';

@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: './footer.component.html',
  // templateUrl: '../../../../app/footer/footer.component.html',
  imports: [
    AsyncPipe,
    DatePipe,
    MarkdownViewerComponent,
    RouterLink,
    TranslateModule,
  ],
})
export class FooterComponent extends BaseComponent implements OnInit {
  dataTrackerValue: string;

  constructor(
    @Optional() cookies: OrejimeService,
    authorizationService: AuthorizationDataService,
    notifyInfoService: NotifyInfoService,
    @Inject(APP_CONFIG) appConfig: AppConfig,
    siteService: SiteDataService,
    locale: LocaleService,
    @Inject(DOCUMENT) private document,
  ) {
    super(cookies, authorizationService, notifyInfoService, appConfig, siteService, locale);
  }
  
  ngOnInit(): void {
      this.loadScript();
  }

  loadScript() {
    const node = this.document.createElement('script');
    if (environment.production) {
      node.src = 'https://webstyle.anu.edu.au/widgets/bundle.js';
      this.dataTrackerValue = 'anu';
    } else {
      node.src = 'https://webstyle-dev.anu.edu.au/widgets/bundle.js';
    }
    node.type = 'text/javascript';
    node.async = true;
    this.document.getElementsByTagName('footer')[0].appendChild(node);
  }
}
