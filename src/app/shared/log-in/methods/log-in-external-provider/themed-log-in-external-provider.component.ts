import { Component, Input } from '@angular/core';
import { ThemedComponent } from '../../../theme-support/themed.component';
import { LogInExternalProviderComponent } from './log-in-external-provider.component';
import { renderAuthMethodFor } from '../log-in.methods-decorator';
import { AuthMethodType } from 'src/app/core/auth/models/auth.method-type';
/**
 * Themed wrapper for {@link LogInExternalProviderComponent}
 */
@Component({
  selector: 'ds-themed-log-in-external-provider',
  styleUrls: [],
  templateUrl: '../../../theme-support/themed.component.html'
})

@renderAuthMethodFor(AuthMethodType.Oidc)
@renderAuthMethodFor(AuthMethodType.Shibboleth)
@renderAuthMethodFor(AuthMethodType.Orcid)
export class ThemedLogInExternalProviderComponent extends ThemedComponent<LogInExternalProviderComponent> {

  @Input() isStandalonePage: boolean;

  protected inAndOutputNames: (keyof LogInExternalProviderComponent & keyof this)[] = [
    'isStandalonePage',
  ];

  protected getComponentName(): string {
    return 'LogInExternalProviderComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../../themes/${themeName}/app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./log-in-external-provider.component');
  }

}
