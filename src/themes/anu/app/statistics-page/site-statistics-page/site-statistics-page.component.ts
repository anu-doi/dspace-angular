import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { SiteDataService } from 'src/app/core/data/site-data.service';
import { UsageReportDataService } from 'src/app/core/statistics/usage-report-data.service';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { RouteService } from 'src/app/core/services/route.service';
import { Component } from '@angular/core';
import { StatisticsPageCommonComponent } from '../common-stat-page-attr/common-stat-page-attr.component';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ds-site-statistics-page',
  styleUrls: ['./site-statistics-page.component.scss'],
  templateUrl: '../common-stat-page-attr/common-stat-page-attr.component.html',
})

/**
 * Component representing the site-wide statistics page.
 */
export class SiteStatisticsPageComponent extends StatisticsPageCommonComponent {

  /**
   * The usage report types to show on this statistics page, as an Observable list.
   */

  types: string[] = [
    'TotalVisits',
    'TotalVisitsPerMonth',
    'TopCountries',
    'TopCities',
    'TopDownloads'
  ];

  constructor(
    protected routeService: RouteService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected authService: AuthService,
    protected dsoService: DSpaceObjectDataService,
    protected siteService: SiteDataService,
    protected http: HttpClient
  ) {
    super(
      routeService,
      route,
      router,
      usageReportService,
      nameService,
      authService,
      http
    );
  }

  protected getScope$() {
    return this.siteService.find();
  }

  protected getReports$() {
    if (!this.filterStats) {
      return this.scope$.pipe(
        switchMap((scope) =>
          this.usageReportService.searchStatistics(scope._links.self.href, 0, 10),
        )
      );
    } else {
      return this.scope$.pipe(
        switchMap((scope) =>
          this.filterStatistics(scope._links.self.href, this.minDate, this.maxDate, this.type, 0, 10),
        )
      );
    }
  }
}
