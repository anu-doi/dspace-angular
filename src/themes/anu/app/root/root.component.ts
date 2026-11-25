import { Component } from '@angular/core';
import { slideSidebarPadding } from '../../../../app/shared/animations/slide';
import { RootComponent as BaseComponent } from '../../../../app/root/root.component';
import { ThemedAdminSidebarComponent } from 'src/app/admin/admin-sidebar/themed-admin-sidebar.component';
import { SystemWideAlertBannerComponent } from 'src/app/system-wide-alert/alert-banner/system-wide-alert-banner.component';
import { ThemedHeaderNavbarWrapperComponent } from 'src/app/header-nav-wrapper/themed-header-navbar-wrapper.component';
import { ThemedBreadcrumbsComponent } from 'src/app/breadcrumbs/themed-breadcrumbs.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LiveRegionComponent } from 'src/app/shared/live-region/live-region.component';
import { RouterOutlet } from '@angular/router';
import { NotificationsBoardComponent } from 'src/app/notification-system/notifications-board/notifications-board.component';
import { ThemedFooterComponent } from 'src/app/footer/themed-footer.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { CulturalSensitivityComponent } from './cultural-sensitivity/cultural-sensitivity.component';

@Component({
  selector: 'ds-root',
  // styleUrls: ['./root.component.scss'],
  styleUrls: ['../../../../app/root/root.component.scss'],
  templateUrl: './root.component.html',
  // templateUrl: '../../../../app/root/root.component.html',
  animations: [slideSidebarPadding],
  imports: [
    AsyncPipe,
    LiveRegionComponent,
    NgClass,
    NotificationsBoardComponent,
    RouterOutlet,
    SystemWideAlertBannerComponent,
    ThemedAdminSidebarComponent,
    ThemedBreadcrumbsComponent,
    ThemedFooterComponent,
    ThemedHeaderNavbarWrapperComponent,
    ThemedLoadingComponent,
    TranslateModule,
    CulturalSensitivityComponent
],
})
export class RootComponent extends BaseComponent {

}
