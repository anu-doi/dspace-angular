import { Component, Inject, OnInit, } from '@angular/core';
import { LogInExternalProviderComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component';
import { AuthMethod } from 'src/app/core/auth/models/auth.method';
import { NativeWindowRef, NativeWindowService } from 'src/app/core/services/window.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HardRedirectService } from 'src/app/core/services/hard-redirect.service';
import { CoreState } from 'src/app/core/core-state.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { URLCombiner } from 'src/app/core/url-combiner/url-combiner';
import { isEmpty, isNotNull } from 'src/app/shared/empty.util';

@Component({
  selector: 'ds-log-in-external-provider',
  templateUrl: '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.html',
  styleUrls: ['../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.scss']
})

export class LogInExternalProviderComponent extends BaseComponent implements OnInit {

  constructor(
    @Inject('authMethodProvider') injectedAuthMethodModel: AuthMethod,
    @Inject('isStandalonePage') isStandalonePage: boolean,
    @Inject(NativeWindowService) _window: NativeWindowRef,
    authService: AuthService,
    hardRedirectService: HardRedirectService,
    store: Store<CoreState>) {
    super(injectedAuthMethodModel,
      isStandalonePage,
      _window,
      authService,
      hardRedirectService,
      store
    );
  }

    /**
     * Redirect to the external provider url for login
     */
    redirectToExternalProvider() {
      console.log("In custom redirect To External Provider");
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
  
        // Check whether the current page is different from the redirect url received from rest
        if (isNotNull(redirectUrlFromServer) && redirectUrlFromServer !== correctRedirectUrl) {
          // change the redirect url with the current page url
          const newRedirectUrl = `?redirectUrl=${correctRedirectUrl}`;
          externalServerUrl = this.location.replace(/\?redirectUrl=(.*)/g, newRedirectUrl);
        }
  
        // add state to the url which uses origin URL
        externalServerUrl = `${externalServerUrl}&state=${encodeURIComponent(redirectRoute)}`;
  
        // redirect to shibboleth authentication url
        this.hardRedirectService.redirect(externalServerUrl);
      });
  
    }
}
