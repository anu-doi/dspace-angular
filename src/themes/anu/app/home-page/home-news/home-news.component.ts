import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MarkdownViewerComponent } from 'src/app/shared/markdown-viewer/markdown-viewer.component';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocaleService } from '@dspace/core/locale/locale.service';
import { select, Store } from '@ngrx/store';
import { CoreState } from '@dspace/core/core-state.model';
import { isAuthenticated } from 'src/app/core/auth/selectors';
import { CreateItemParentSelectorComponent } from 'src/app/shared/dso-selector/modal-wrappers/create-item-parent-selector/create-item-parent-selector.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  // styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  templateUrl: './home-news.component.html',
  // templateUrl: '../../../../../app/home-page/home-news/home-news.component.html',
  imports: [
    AsyncPipe,
    MarkdownViewerComponent,
    RouterLink
  ],
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;

  constructor(
    route: ActivatedRoute,
    locale: LocaleService,
    private store: Store<CoreState>,
    private modalService: NgbModal,
  ) {
    super(route,
      locale
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));
  }

  openScopeModal() {
    const ref = this.modalService.open(CreateItemParentSelectorComponent);
  }
}
