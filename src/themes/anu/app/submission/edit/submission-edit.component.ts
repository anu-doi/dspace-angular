import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SubmissionEditComponent as BaseComponent } from '../../../../../app/submission/edit/submission-edit.component';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from 'src/app/submission/submission.service';
import { ItemDataService } from 'src/app/core/data/item-data.service';
import { TranslateService } from '@ngx-translate/core';
import { SubmissionJsonPatchOperationsService } from 'src/app/core/submission/submission-json-patch-operations.service';
import { RequestService } from 'src/app/core/data/request.service';
import { take } from 'lodash';
import { ObjectCacheService } from 'src/app/core/cache/object-cache.service';

/**
 * This component allows to edit an existing workspaceitem/workflowitem.
 */
@Component({
  selector: 'ds-submission-edit',
  // styleUrls: ['./submission-edit.component.scss'],
  styleUrls: ['../../../../../app/submission/edit/submission-edit.component.scss'],
  // templateUrl: './submission-edit.component.html'
  templateUrl: '../../../../../app/submission/edit/submission-edit.component.html'
})
export class SubmissionEditComponent extends BaseComponent
  implements OnInit {
  constructor(changeDetectorRef: ChangeDetectorRef,
    notificationsService: NotificationsService,
    route: ActivatedRoute,
    router: Router,
    itemDataService: ItemDataService,
    submissionService: SubmissionService,
    translate: TranslateService,
    submissionJsonPatchOperationsService: SubmissionJsonPatchOperationsService,
    protected requestService: RequestService,
    protected activateRoute: ActivatedRoute) {
    super(
      changeDetectorRef,
      notificationsService,
      route,
      router,
      itemDataService,
      submissionService,
      translate,
      submissionJsonPatchOperationsService
    );
  }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.requestService.removeByHrefSubstring(id);
    }
    super.ngOnInit();
  }
}
