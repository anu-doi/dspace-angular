import { Component } from '@angular/core';
import { StatisticsPageCommonComponent } from '../common-stat-page-attr/common-stat-page-attr.component';

@Component({
  selector: 'ds-community-statistics-page',
  styleUrls: ['./community-statistics-page.component.scss'],
  templateUrl: '../common-stat-page-attr/common-stat-page-attr.component.html',
})

/**
 * Component representing the statistics page for a community.
 */
export class CommunityStatisticsPageComponent extends StatisticsPageCommonComponent {
  types: string[] = [
    'TotalVisits',
    'TotalVisitsPerMonth',
    'TopCountries',
    'TopCities',
    'TotalDownloads'
  ];
}
