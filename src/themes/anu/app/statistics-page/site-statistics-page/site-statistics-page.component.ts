import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { SiteDataService } from 'src/app/core/data/site-data.service';
import { UsageReportDataService } from 'src/app/core/statistics/usage-report-data.service';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { RouteService } from 'src/app/core/services/route.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatisticsPageCommonComponent } from '../common-stat-page-attr/common-stat-page-attr.component';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { hasValue } from 'src/app/shared/empty.util';
import { UsageReport } from 'src/app/core/statistics/models/usage-report.model';
import { getFirstSucceededRemoteData, getRemoteDataPayload } from 'src/app/core/shared/operators';

@Component({
  selector: 'ds-site-statistics-page',
  styleUrls: ['./site-statistics-page.component.scss'],
  // templateUrl: '../common-stat-page-attr/common-stat-page-attr.component.html',
  templateUrl: './site-statistics-page.component.html',
})

/**
 * Component representing the site-wide statistics page.
 */
export class SiteStatisticsPageComponent extends StatisticsPageCommonComponent implements OnInit {

  /**
   * The usage report types to show on this statistics page, as an Observable list.
   */

  selectedValue = 'TotalVisits';
  defaultNumber = 5;
  value: any;
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
    this.route.queryParams.subscribe(params => {
      this.minDate = params.minDate;
      this.maxDate = params.maxDate;
      this.type = params.type || this.selectedValue;
      this.filterValue = params.noofitems || this.defaultNumber;
    });
    this.router.navigate([], {
      queryParams: Object.assign({ type: this.selectedValue, noofitems: this.filterValue }),
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit(): void {
    this.selectedValue = this.type;
    this.filterStats = false;
    super.ngOnInit();
    this.onOptionsSelected(this.selectedValue);
    this.onNumberChange(this.filterValue);
  }

  protected getScope$() {
    return this.siteService.find();
  }

  public getReports$() {
    let startDate: string | undefined;
    let endDate: string | undefined;
    if (!this.filterStats && !this.numberChange) {
      return this.scope$.pipe(
        switchMap((scope) =>
          this.searchStatistics(scope._links.self.href, 0, this.filterValue),
        )
      );
    } else {
      if (this.minDate === undefined) {
        startDate = null;
      } else {
        startDate = this.minDate;
      }
      if (this.maxDate === undefined) {
        endDate = null;
      } else {
        endDate = this.maxDate;
      }
      return this.scope$.pipe(
        switchMap((scope) =>
          this.filterStatistics(scope._links.self.href, this.type, 0, this.filterValue, startDate, endDate),
        )
      );
    }
  }

  searchStatistics(uri: string, page: number, size: number): Observable<UsageReport[]> {
    return this.usageReportService.searchBy('object', {
      searchParams: [
        {
          fieldName: `uri`,
          fieldValue: uri,
        },
      ],
      currentPage: page,
      elementsPerPage: size,
    }, false, false).pipe(
      getFirstSucceededRemoteData(),
      getRemoteDataPayload(),
      map((list) => list.page),
    );
  }

  ngOnDestroy(): void {
    this.subs.filter((sub) => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }
}
