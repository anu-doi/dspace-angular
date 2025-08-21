import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { AlertType } from '../../../../../../app/shared/alert/alert-type';
import { BehaviorSubject, Observable, Subscription, combineLatest, find, map, of, startWith, switchMap, take } from 'rxjs';
import {CAPTCHA_NAME, GoogleRecaptchaService} from '../../../../../../app/core/google-recaptcha/google-recaptcha.service';

import { BitstreamRequestACopyPageComponent  as BaseComponent } from '../../../../../../app/item-page/bitstreams/request-a-copy/bitstream-request-a-copy-page.component'
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { ConfigurationDataService } from 'src/app/core/data/configuration-data.service';
import { CookieService } from 'src/app/core/services/cookie.service';
import { KlaroService } from 'src/app/shared/cookies/klaro.service';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Location } from '@angular/common';

import {RemoteData} from 'src/app/core/data/remote-data';

import { ItemRequestDataService } from 'src/app/core/data/item-request-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { BitstreamDataService } from 'src/app/core/data/bitstream-data.service';
import { hasValue, isNotEmpty } from 'src/app/shared/empty.util';
import { ItemRequest } from 'src/app/core/shared/item-request.model';
import { getFirstCompletedRemoteData, getFirstSucceededRemoteDataPayload } from 'src/app/core/shared/operators';
import { ConfigurationProperty } from 'src/app/core/shared/configuration-property.model';
import { RequestService } from 'src/app/core/data/request.service';
import { PostRequest } from 'src/app/core/data/request.models';
import { RemoteDataBuildService } from 'src/app/core/cache/builders/remote-data-build.service';
import { HttpOptions } from 'src/app/core/dspace-rest/dspace-rest.service';
import { HttpHeaders } from '@angular/common/http';
import { Item } from 'src/app/core/shared/item.model';

@Component({
  selector: 'ds-bitstream-request-a-copy-page',
  templateUrl: './bitstream-request-a-copy-page.component.html'
  // templateUrl: '../../../../../../app/item-page/bitstreams/request-a-copy/bitstream-request-a-copy-page.component.html',
})
/**
 * Page component for requesting a copy for a bitstream
 */
export class BitstreamRequestACopyPageComponent extends BaseComponent implements OnInit{

  public AlertTypeEnum = AlertType;

  /**
   * registration verification configuration
   */
  registrationVerification = false;

  /**
   * Return true if the user completed the reCaptcha verification (checkbox mode)
   */
  checkboxCheckedSubject$ = new BehaviorSubject<boolean>(false);

  disableUntilChecked = true;

  subscriptions: Subscription[] = [];

  captchaVersion(): Observable<string> {
    return this.googleRecaptchaService.captchaVersion();
  }

  captchaMode(): Observable<string> {
    return this.googleRecaptchaService.captchaMode();
  }

  constructor(
    protected location: Location,
    protected translateService: TranslateService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected authorizationService: AuthorizationDataService,
    protected auth: AuthService,
    protected formBuilder: UntypedFormBuilder,
    protected notificationService: NotificationsService,
    protected itemRequestDataService: ItemRequestDataService,
    protected configService: ConfigurationDataService,
    public googleRecaptchaService: GoogleRecaptchaService,
    public cookieService: CookieService,
    @Optional() public klaroService: KlaroService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected notificationsService: NotificationsService,
    protected dsoNameService: DSONameService,
    protected bitstreamService: BitstreamDataService,
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
  ){
    super(location, translateService, route, router, authorizationService,
      auth, formBuilder, itemRequestDataService, notificationsService, dsoNameService, bitstreamService);
  }

  ngOnInit(): void {
   super.ngOnInit();
   this.subscriptions.push(this.configService.findByPropertyName('registration.verification.enabled').pipe(
    getFirstSucceededRemoteDataPayload(),
    map((res: ConfigurationProperty) => res?.values[0].toLowerCase() === 'true')
  ).subscribe((res: boolean) => {
    this.registrationVerification = res;
  }));
  this.subscriptions.push(this.disableUntilCheckedFcn().subscribe((res) => {
    this.disableUntilChecked = res;
    this.changeDetectorRef.detectChanges();
  }));
  }

    /**
   * execute the captcha function for v2 invisible
   */
    executeRecaptcha() {
      this.googleRecaptchaService.executeRecaptcha();
    }

    /**
   * Request a copy
   */
    requestCopy(tokenV2?) {
      if (!this.requestCopyForm.invalid) {
        if (this.registrationVerification) {
          this.subscriptions.push(combineLatest([this.captchaVersion(), this.captchaMode()]).pipe(
            switchMap(([captchaVersion, captchaMode])  => {
              if (captchaVersion === 'v3') {
                return this.googleRecaptchaService.getRecaptchaToken('request_email_copy');
              } else if (captchaVersion === 'v2' && captchaMode === 'checkbox') {
                return of(this.googleRecaptchaService.getRecaptchaTokenResponse());
              } else if (captchaVersion === 'v2' && captchaMode === 'invisible') {
                return of(tokenV2);
              } else {
                console.error(`Invalid reCaptcha configuration: version = ${captchaVersion}, mode = ${captchaMode}`);
                this.showNotification('error');
              }
            }),
            take(1),
          ).subscribe((token) => {
              if (isNotEmpty(token)) {
                this.request(token);
              } else {
                console.error('reCaptcha error');
                this.showNotification('error');
              }
            }
          ));
        } else {
          this.request();
        }
      }
    }

  isRecaptchaCookieAccepted(): boolean {
    const klaroAnonymousCookie = this.cookieService.get('klaro-anonymous');
    return isNotEmpty(klaroAnonymousCookie) ? klaroAnonymousCookie[CAPTCHA_NAME] : false;
  }

  /**
   * Return true if the user has not completed the reCaptcha verification (checkbox mode)
   */
  disableUntilCheckedFcn(): Observable<boolean> {
    const checked$ = this.checkboxCheckedSubject$.asObservable();
    return combineLatest([this.captchaVersion(), this.captchaMode(), checked$]).pipe(
      // disable if checkbox is not checked or if reCaptcha is not in v2 checkbox mode
      switchMap(([captchaVersion, captchaMode, checked])  => captchaVersion === 'v2' && captchaMode === 'checkbox' ? of(!checked) : of(false)),
      startWith(true),
    );
  }

  onCheckboxChecked(checked: boolean) {
    this.checkboxCheckedSubject$.next(checked);
  }

    /**
   * Show a notification to the user
   * @param key
   */
  showNotification(key) {
    const notificationTitle = this.translateService.get('bitstream-request-a-copy.google-recaptcha.notification.title');
    const notificationErrorMsg = this.translateService.get('bitstream-request-a-copy.google-recaptcha.notification.message.error');
    const notificationExpiredMsg = this.translateService.get('bitstream-request-a-copy.google-recaptcha.notification.message.expired');
    switch (key) {
      case 'expired':
        this.notificationsService.warning(notificationTitle, notificationExpiredMsg);
        break;
      case 'error':
        this.notificationsService.error(notificationTitle, notificationErrorMsg);
        break;
      default:
        console.warn(`Unimplemented notification '${key}' from reCaptcha service`);
    }
  }

  request(captchaToken = null) {
    const itemRequest = new ItemRequest();
    if (hasValue(this.bitstream)) {
      itemRequest.bitstreamId = this.bitstream.uuid;
    }
    itemRequest.itemId = this.item.uuid;
    itemRequest.allfiles = this.allfiles.value;
    itemRequest.requestEmail = this.email.value;
    itemRequest.requestName = this.name.value;
    itemRequest.requestMessage = this.message.value;

    let submitResponse$ = captchaToken ? this.requestACopy(itemRequest, captchaToken):this.requestACopy(itemRequest, null);
    this.subscriptions.push(submitResponse$.subscribe((rd: RemoteData<ItemRequest>) => {
      if (rd.hasSucceeded) {
        this.notificationsService.success(this.translateService.get('bitstream-request-a-copy.submit.success'));
        this.navigateBack();
      } else {
        this.notificationsService.error(this.translateService.get('bitstream-request-a-copy.submit.error'));
      }
    }));
  }


    /**
   * Request a copy of an item
   * Item request service function
   * @param itemRequest
   */
    requestACopy(itemRequest: ItemRequest, captchaToken: string = null): Observable<RemoteData<ItemRequest>> {

      const requestId = this.requestService.generateRequestId();

      const href$ = this.itemRequestDataService.getItemRequestEndpoint();

      const options: HttpOptions = Object.create({});
      let headers = new HttpHeaders();
      if (captchaToken) {
        headers = headers.append('x-recaptcha-token', captchaToken);
      }
      options.headers = headers;

      href$.pipe(
        find((href: string) => hasValue(href)),
        map((href: string) => {
          const request = new PostRequest(requestId, href, itemRequest, options);
          this.requestService.send(request);
        })
      ).subscribe();

      return this.rdbService.buildFromRequestUUID<ItemRequest>(requestId).pipe(
        getFirstCompletedRemoteData()
      );
    }
}
