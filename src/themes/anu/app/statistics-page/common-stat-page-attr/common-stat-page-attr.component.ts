import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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
import { RESTURLCombiner } from 'src/app/core/url-combiner/rest-url-combiner';
import { hasValue } from 'src/app/shared/empty.util';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';
import { StatisticsPageComponent } from 'src/app/statistics-page/statistics-page/statistics-page.component';

/**
 * Class representing an abstract statistics page component.
 */
@Component({
  selector: 'ds-common-statistics-page-attr',
  template: ''
})

export abstract class StatisticsPageCommonComponent extends StatisticsPageComponent<Site>{

  baseApiUrl = new RESTURLCombiner().toString();
  exportApiUrl = '/statistics/usagereports/exportstatistics?uri=';
  selectedValue = 'TotalVisits';
  reports$: Observable<UsageReport[]>;

  formData: FormGroup = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl()
  });

  minDate: string;
  maxDate: string;
  filterStats = false;
  subs: Subscription[] = [];
  type: string;
  dateChange: boolean;
  exportStats: boolean;
  uri: string;
  filterValue: number;
  numberChange = false;
  defaultNumber = 5;

  constructor(
    protected routeService: RouteService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected authService: AuthService,
    protected http: HttpClient,
    protected sidebarService: SidebarService,
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
      this.type = params.type || this.selectedValue;
      this.filterValue = params.noofitems || this.defaultNumber;
    });

    this.router.navigate([], {
      queryParams: Object.assign({ type: this.type, noofitems: this.filterValue }),
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

  getChangeFromDatePicker(item: string) {
    const splitVar = item.split(':');
    this.minDate = splitVar[0];
    this.maxDate = splitVar[1];
    this.dateChange = JSON.parse(splitVar[2]);
    if (this.dateChange) {
      this.filterStats = true;
    }
    this.reports$ = this.getReports$();
  }

  writeData() {
    this.scope$.subscribe((scope) =>
      this.uri = scope._links.self.href);
    this.exportStatistics(this.type, this.uri
    ).subscribe(
      (response: any) => {
        const blobUrl = window.URL.createObjectURL(response.body);
        const link = document.createElement('a');
        const fileName = response.headers.get('Content-Disposition').split('filename=')[1];
        link.href = blobUrl;
        link.download = fileName;
        link.click();
      }
    );
  }

  public openSidebar(): void {
    this.sidebarService.expand();
  }

  closeSidebar() {
    this.sidebarService.collapse();
  }
  
  exportStatistics(type: string, uri: string): Observable<HttpResponse<Blob>> {
    let encodedUri = encodeURI(uri);
    let startDate: string | undefined;
    let endDate: string | undefined;
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

    let url = this.baseApiUrl + this.exportApiUrl + encodedUri + '&startdate=' + startDate + '&enddate=' + endDate + '&type=' + type;
    return this.http.get(url,
      {
        observe: 'response',
        responseType: 'blob',
      }
    );
  }

  protected getReports$() {
    let startDate: string | undefined;
    let endDate: string | undefined;
    if (!this.filterStats && !this.numberChange) {
      return this.scope$.pipe(
        switchMap((scope) =>
          combineLatest(
            this.types.map((type) => this.usageReportService.getStatistic(scope.id, type))
          ),
        ),
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

  filterStatistics(uri: string, type: string, page: number, size: number, startdate: string, enddate: string): Observable<UsageReport[]> {
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
    }, false, false).pipe(
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
    this.reports$ = this.getReports$();
  }

  onNumberChange(value: number) {
    this.route.queryParams.subscribe(params => {
      this.minDate = params.minDate;
      this.maxDate = params.maxDate;
      this.filterValue = params.noofitems;
    });
    this.router.navigate([], {
      queryParams: Object.assign({ noofitems: value }),
      queryParamsHandling: 'merge'
    });
    this.numberChange = true;
    this.reports$ = this.getReports$();
    this.numberChange = false;
  }

  ngOnDestroy(): void {
    this.subs.filter((sub) => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }
}
