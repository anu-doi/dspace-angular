import { Component, Input, OnInit } from '@angular/core';
import { UsageReport } from 'src/app/core/statistics/models/usage-report.model';



@Component({
  selector: 'ds-total-views-downloads',
  templateUrl: './total-views-downloads.component.html',
  styleUrls: ['./total-views-downloads.component.scss'],
})
export class TotalViewsDownloadsComponent implements OnInit {
  @Input()
  report: UsageReport;

  views: number;
  label1: string;
  downloads: number;
  label2: string;

  ngOnInit() {
    if (this.report != null) {
      this.views = this.report.points[0].values['views'];
      this.downloads = this.report.points[1].values['views'];
    }
  }
}
