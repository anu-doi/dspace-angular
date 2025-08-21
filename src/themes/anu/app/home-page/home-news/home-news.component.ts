import { Component, OnInit } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateItemParentSelectorComponent } from 'src/app/shared/dso-selector/modal-wrappers/create-item-parent-selector/create-item-parent-selector.component';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/core/auth/selectors';
import { select, Store } from '@ngrx/store';
import { CoreState } from 'src/app/core/core-state.model';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  // styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  templateUrl: './home-news.component.html'
  // templateUrl: '../../../../../app/home-page/home-news/home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent implements OnInit {
  canRegister$: Observable<boolean>;
  public isAuthenticated: Observable<boolean>;

  constructor(
    private modalService: NgbModal,
    private authorizationService: AuthorizationDataService,
    private store: Store<CoreState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));
  }

  openScopeModal() {
    const ref = this.modalService.open(CreateItemParentSelectorComponent);
  }
}
