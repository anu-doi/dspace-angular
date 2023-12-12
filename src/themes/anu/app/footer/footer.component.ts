import { Component } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { environment } from '../../../../environments/environment';

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

  ngOnInit(){
    this.loadscript();
  }

  loadscript(){
    const node = document.createElement('script');
    if (environment.production) {
      node.src = 'https://webstyle.anu.edu.au/widgets/bundle.js';
      this.dataTrackerValue = 'anu';
    } else {
      node.src = 'https://webstyle-dev.anu.edu.au/widgets/bundle.js';
    }
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('footer')[0].appendChild(node);
  }
}
