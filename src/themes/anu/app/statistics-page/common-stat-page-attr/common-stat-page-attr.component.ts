import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { RouteService } from 'src/app/core/services/route.service';
import { getFirstSucceededRemoteData, getRemoteDataPayload } from 'src/app/core/shared/operators';
import { Site } from 'src/app/core/shared/site.model';
import { UsageReport } from 'src/app/core/statistics/models/usage-report.model';
import { UsageReportDataService } from 'src/app/core/statistics/usage-report-data.service';
import { hasValue } from 'src/app/shared/empty.util';
import { StatisticsPageComponent } from 'src/app/statistics-page/statistics-page/statistics-page.component';

/**
 * Class representing an abstract statistics page component.
 */
@Component({
  selector: 'ds-common-statistics-page-attr',
  template: ''
})

export abstract class StatisticsPageCommonComponent extends StatisticsPageComponent<Site>{

  reports$: Observable<UsageReport[]>;

  formData: FormGroup = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl()
  });

  minDate: string;
  maxDate: string;
  filterStats = false;
  subs: Subscription[] = [];
  selectedValue = 'TotalVisits';
  type: string;
  dateChange: boolean;

  constructor(
    protected routeService: RouteService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected authService: AuthService,
  ) {
    super(
      route,
      router,
      usageReportService,
      nameService,
      authService,
    );

    this.route.queryParams.subscribe(params => {
      this.minDate = params.minDate;
      this.maxDate = params.maxDate;
      this.type = params.type;
    });

    if (this.minDate == null && this.maxDate == null && this.type == null) {
      this.router.navigate([], {
        queryParams: Object.assign({ type: this.selectedValue }),
        queryParamsHandling: 'merge'
      });
    }
  }

  ngOnInit() {
    this.selectedValue = this.type;
    this.onOptionsSelected(this.selectedValue);
    this.filterStats = false;

    if (this.minDate != null && this.maxDate != null) {
      this.getChangeFromDatePicker(true);
    }
    else {
      super.ngOnInit();
    }
  }

  getChangeFromDatePicker(item: boolean) {
    this.dateChange = item;
    if (this.dateChange) {
      this.filterStats = true;
      super.ngOnInit();
    }
  }

  protected getReports$() {
    if (!this.filterStats) {
      return this.scope$.pipe(
        switchMap((scope) =>
          combineLatest(
            this.types.map((type) => this.usageReportService.getStatistic(scope.id, type))
          ),
        ),
      );
    } else {
      return this.scope$.pipe(
        switchMap((scope) =>
          this.filterStatistics(scope._links.self.href, this.minDate, this.maxDate, this.type, 0, 10),
        )
      );
    }
  }

  filterStatistics(uri: string, startdate: string, enddate: string, type: string, page: number, size: number): Observable<UsageReport[]> {
    return this.usageReportService.searchBy('filterstatistics', {
      searchParams: [
        {
          fieldName: `uri`,
          fieldValue: uri,
        },
        {
          fieldName: `startdate`,
          fieldValue: startdate,
        },
        {
          fieldName: `enddate`,
          fieldValue: enddate,
        },
        {
          fieldName: `type`,
          fieldValue: type,
        }
      ],
      currentPage: page,
      elementsPerPage: size,
    }, true, false).pipe(
      getFirstSucceededRemoteData(),
      getRemoteDataPayload(),
      map((list) => list.page),
    );
  }

  onOptionsSelected(value: string) {
    this.route.queryParams.subscribe(params => {
      this.minDate = params.minDate;
      this.maxDate = params.maxDate;
      this.type = params.type;
    });

    this.router.navigate([], {
      queryParams: Object.assign({ type: value }),
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    this.subs.filter((sub) => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }
}
