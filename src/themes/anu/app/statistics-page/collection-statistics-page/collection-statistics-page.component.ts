import { Component } from '@angular/core';
import { StatisticsPageCommonComponent } from '../common-stat-page-attr/common-stat-page-attr.component';


@Component({
  selector: 'ds-collection-statistics-page',
  styleUrls: ['./collection-statistics-page.component.scss'],
  templateUrl: '../common-stat-page-attr/common-stat-page-attr.component.html',
})

/**
 * Component representing the statistics page for a collection.
 */
export class CollectionStatisticsPageComponent extends StatisticsPageCommonComponent {
  /**
   * The report types to show on this statistics page.
   */
  types: string[] = [
    'TotalVisits',
    'TotalVisitsPerMonth',
    'TopCountries',
    'TopCities',
    'TotalDownloads',
    'TotalVisitsDownloads'
  ];
}
