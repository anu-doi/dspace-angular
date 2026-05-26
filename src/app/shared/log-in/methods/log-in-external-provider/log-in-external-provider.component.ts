import { Component, Inject, OnInit, } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthMethod } from '../../../../core/auth/models/auth.method';

import { isAuthenticated, isAuthenticationLoading } from '../../../../core/auth/selectors';
import { NativeWindowRef, NativeWindowService } from '../../../../core/services/window.service';
import { isEmpty, isNotNull } from '../../../empty.util';
import { AuthService } from '../../../../core/auth/auth.service';
import { HardRedirectService } from '../../../../core/services/hard-redirect.service';
import { URLCombiner } from '../../../../core/url-combiner/url-combiner';
import { CoreState } from '../../../../core/core-state.model';
import { renderAuthMethodFor } from '../log-in.methods-decorator';
import { AuthMethodType } from '../../../../core/auth/models/auth.method-type';

@Component({
  selector: 'ds-log-in-external-provider',
  templateUrl: './log-in-external-provider.component.html',
  styleUrls: ['./log-in-external-provider.component.scss']
})
@renderAuthMethodFor(AuthMethodType.Oidc)
@renderAuthMethodFor(AuthMethodType.Shibboleth)
@renderAuthMethodFor(AuthMethodType.Orcid)
export class LogInExternalProviderComponent implements OnInit {

  /**
   * The authentication method data.
   * @type {AuthMethod}
   */
  public authMethod: AuthMethod;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  /**
   * The shibboleth authentication location url.
   * @type {string}
   */
  public location: string;

  /**
   * Whether user is authenticated.
   * @type {Observable<string>}
   */
  public isAuthenticated: Observable<boolean>;

  /**
   * @constructor
   * @param {AuthMethod} injectedAuthMethodModel
   * @param {boolean} isStandalonePage
   * @param {NativeWindowRef} _window
   * @param {AuthService} authService
   * @param {HardRedirectService} hardRedirectService
   * @param {Store<State>} store
   */
  constructor(
    @Inject('authMethodProvider') public injectedAuthMethodModel: AuthMethod,
    @Inject('isStandalonePage') public isStandalonePage: boolean,
    @Inject(NativeWindowService) protected _window: NativeWindowRef,
    private authService: AuthService,
    private hardRedirectService: HardRedirectService,
    private store: Store<CoreState>
  ) {
    this.authMethod = injectedAuthMethodModel;
  }

  ngOnInit(): void {
    // set isAuthenticated
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));

    // set loading
    this.loading = this.store.pipe(select(isAuthenticationLoading));

    // set location
    this.location = decodeURIComponent(this.injectedAuthMethodModel.location);

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
      this.authService.setRedirectUrl(redirectRoute);
      console.log('After setRedirectUrl');
      // redirect to shibboleth authentication url
      this.hardRedirectService.redirect(externalServerUrl);
    });
    // this.authService.getRedirectUrl().pipe(take(1)).subscribe((redirectRoute) => {
    //   if (!this.isStandalonePage) {
    //     redirectRoute = this.hardRedirectService.getCurrentRoute();
    //   } else if (isEmpty(redirectRoute)) {
    //     redirectRoute = '/';
    //   }
    //   const correctRedirectUrl = new URLCombiner(this._window.nativeWindow.origin, redirectRoute).toString();
    //   console.log("correct Redirect URL : "+correctRedirectUrl);
    //   let externalServerUrl = this.location;
      
    //   let externalServerUrl2 = new URL(this.location, this._window.nativeWindow.origin);
    //   const myRegexp = /\?redirectUrl=(.*)/g;
    //   const match = myRegexp.exec(this.location);
    //   const redirectUrlFromServer = (match && match[1]) ? match[1] : null;

    //   console.log("correct Redirect URL : "+correctRedirectUrl);
    //   console.log("external Server URL : "+externalServerUrl);
    //   console.log('Redirect URL from server : '+redirectUrlFromServer);

    //   if(externalServerUrl2.searchParams.has('redirect_uri')){
    //       const redirectUri = new URL(externalServerUrl2.searchParams.get('redirect_uri'), this._window.nativeWindow.origin);
    //       redirectUri.searchParams.set('redirectUrl', correctRedirectUrl);
    //       externalServerUrl2.searchParams.set('redirect_uri', redirectUri.toString());

    //       console.log("external Server URL 2 : "+externalServerUrl2);
    //       externalServerUrl = `${externalServerUrl2.pathname}${externalServerUrl2.search}${externalServerUrl2.hash}`;
    //       console.log("external Server URL after assign : "+externalServerUrl);
    //   }
    //   // Check whether the current page is different from the redirect url received from rest
    //   // if (isNotNull(redirectUrlFromServer) && redirectUrlFromServer !== correctRedirectUrl) {
    //   //   // change the redirect url with the current page url
    //   //   const newRedirectUrl = `?redirectUrl=${correctRedirectUrl}`;
    //   //   externalServerUrl = this.location.replace(/\?redirectUrl=(.*)/g, newRedirectUrl);
    //   //   console.log("inside if : "+externalServerUrl);
    //   // }

    //   // redirect to shibboleth authentication url
      
    //   this.hardRedirectService.redirect(externalServerUrl2.toString());
    // });

  }

  getButtonLabel() {
    return `login.form.${this.authMethod.authMethodType}`;
  }
}
