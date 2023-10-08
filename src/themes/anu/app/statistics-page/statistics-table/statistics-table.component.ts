import { Component, Input, OnInit } from '@angular/core';
import { Point } from 'src/app/core/statistics/models/usage-report.model';
import { StatisticsTableComponent as BaseComponent } from 'src/app/statistics-page/statistics-table/statistics-table.component';
import { autoserialize } from 'cerialize';
import { HttpClient} from '@angular/common/http';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component representing a statistics table for a given usage report.
 */
@Component({
  selector: 'ds-statistics-table',
  templateUrl: './statistics-table.component.html',
  // templateUrl: 'src/app/statistics-page/statistics-table/statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss'],
  // styleUrls: ['../../../../../app/statistics-page/statistics-table/statistics-table.component.scss']
})
export class StatisticsTableComponent extends BaseComponent implements OnInit {

  /**
   * The usage report to display a statistics table for
   */
  @Input()
  report: any;

  @Input()
  selectedValue: string;

  @autoserialize
  points: AugPoint[];

  /**
   * Boolean indicating whether the usage report has data
   */
  hasData: boolean;

  /**
   * The table headers
   */
  headers: string[];
  headers1: string[];

  constructor(protected dsoService: DSpaceObjectDataService,
    protected nameService: DSONameService, 
    private http: HttpClient, 
    protected route: ActivatedRoute,
    protected router: Router, 
    protected translateService: TranslateService,) {
    super(dsoService, nameService, translateService);
  }
  ngOnInit() {
    this.hasData = this.report.points.length > 0;
    if (this.hasData) {
      this.headers = Object.keys(this.report.points[0].values);
      if (this.report.points[0].values1 != null) {
        this.headers1 = Object.keys(this.report.points[0].values1);
      }
    }
  }
}

/**
 * A statistics data point. &startdate=2023-02-01&enddate=2023-02-28&
 */
export interface AugPoint extends Point {
  id: string;
  label: string;
  type: string;
  values: {
    views: number;
  }[];
  values1: {
    items: string;
  }[];
}
