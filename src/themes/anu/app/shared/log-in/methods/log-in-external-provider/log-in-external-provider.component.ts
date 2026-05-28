import { Component, Inject } from '@angular/core';
import { LogInExternalProviderComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component';
import { take } from 'rxjs/operators';
import {  Store } from '@ngrx/store';
import { NativeWindowRef, NativeWindowService } from 'src/app/core/services/window.service';
import { AuthMethod } from 'src/app/core/auth/models/auth.method';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HardRedirectService } from 'src/app/core/services/hard-redirect.service';
import { CoreState } from 'src/app/core/core-state.model';
import { isEmpty, isNotNull } from 'src/app/shared/empty.util';
import { URLCombiner } from 'src/app/core/url-combiner/url-combiner';


@Component({
  selector: 'ds-log-in-external-provider',
  // templateUrl: './log-in-external-provider.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.html',
  styleUrls: ['../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.scss'],
  // styleUrls: ['./log-in-external-provider.component.scss']
})


export class LogInExternalProviderComponent extends BaseComponent {

  constructor(
    @Inject('authMethodProvider') injectedAuthMethodModel: AuthMethod,
    @Inject('isStandalonePage') isStandalonePage: boolean,
    @Inject(NativeWindowService) _window: NativeWindowRef,
    authService: AuthService,
    hardRedirectService: HardRedirectService,
    store: Store<CoreState>
  ) {
    super(injectedAuthMethodModel, isStandalonePage, _window, authService, hardRedirectService, store);
  }


  /**
   * Redirect to the external provider url for login
   */
  redirectToExternalProvider() {
        this.authService.getRedirectUrl().pipe(take(1)).subscribe((redirectRoute) => {
      if (!this.isStandalonePage) {
        redirectRoute = this.hardRedirectService.getCurrentRoute();
      } else if (isEmpty(redirectRoute)) {
        redirectRoute = '/';
      }
      const correctRedirectUrl = new URLCombiner(this._window.nativeWindow.origin, redirectRoute).toString();

      let externalServerUrl = this.location;
      const myRegexp = /\?redirectUrl=(.*)/g;
      const match = myRegexp.exec(this.location);
      const redirectUrlFromServer = (match && match[1]) ? match[1] : null;


      console.log('correct Redirect URL : '+correctRedirectUrl);
      console.log('external Server URL : '+externalServerUrl);
      console.log('Redirect URL from server : '+redirectUrlFromServer);

      // Check whether the current page is different from the redirect url received from rest
      if (isNotNull(redirectUrlFromServer) && redirectUrlFromServer !== correctRedirectUrl) {
        // change the redirect url with the current page url
        const newRedirectUrl = `?redirectUrl=${correctRedirectUrl}`;
        externalServerUrl = this.location.replace(/\?redirectUrl=(.*)/g, newRedirectUrl);
      }

      //store redirect url
      externalServerUrl = `${externalServerUrl}&state=${encodeURIComponent(redirectRoute)}`;
      console.log('externalServerUrl before redirect: '+externalServerUrl);
      // redirect to shibboleth authentication url
      this.hardRedirectService.redirect(externalServerUrl);
    });
  }

}
