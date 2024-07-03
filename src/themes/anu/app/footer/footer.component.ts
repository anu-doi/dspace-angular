import { Component, Inject, Optional } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { environment } from '../../../../environments/environment';
import { KlaroService } from '../../../../app/shared/cookies/klaro.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: 'footer.component.html'
  // templateUrl: '../../../../app/footer/footer.component.html'
})
export class FooterComponent extends BaseComponent {
  showTopFooter = true;
  dataTrackerValue = null;

  constructor(
    @Optional() private cookies1: KlaroService,
    authorizationService: AuthorizationDataService,
    @Inject(DOCUMENT) private document,
  ) {
    super(cookies1, authorizationService);
  }
  ngOnInit(){
    this.loadscript();
  }

  loadscript(){
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
