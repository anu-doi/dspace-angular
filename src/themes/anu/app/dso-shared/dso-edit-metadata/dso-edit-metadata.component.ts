import { getFirstCompletedRemoteData } from 'src/app/core/shared/operators';
import { DsoEditMetadataComponent as BaseComponent } from '../../../../../app/dso-shared/dso-edit-metadata/dso-edit-metadata.component';
import { Component } from '@angular/core';
import { RemoteData } from 'src/app/core/data/remote-data';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';


@Component({
  selector: 'ds-dso-edit-metadata',
  // styleUrls: ['./dso-edit-metadata.component.scss'],
  styleUrls: ['../../../../../app/dso-shared/dso-edit-metadata/dso-edit-metadata.component.scss'],
  // templateUrl: './dso-edit-metadata.component.html',
  templateUrl: '../../../../../app/dso-shared/dso-edit-metadata/dso-edit-metadata.component.html',
})
export class DsoEditMetadataComponent extends BaseComponent {

    /**
     * Submit the current changes to the form by retrieving json PATCH operations from the form and sending it to the
     * DSpaceObject's data-service
     * Display notificiations and reset the form afterwards if successful
     */
    submit(): void {
      this.saving$.next(true);
      this.updateDataService.patch(this.dso, this.form.getOperations(this.arrayMoveChangeAnalyser)).pipe(
        getFirstCompletedRemoteData()
      ).subscribe((rd: RemoteData<DSpaceObject>) => {
        this.saving$.next(false);
        if (rd.hasFailed) {
          this.notificationsService.error(this.translateService.instant(`${this.dsoType}.edit.metadata.notifications.error.title`), rd.errorMessage);
        } else {
          this.notificationsService.success(
              this.translateService.instant(`${this.dsoType}.edit.metadata.notifications.saved.title`),
              this.translateService.instant(`${this.dsoType}.edit.metadata.notifications.saved.content`)
          );
          this.dso = rd.payload;
          this.initForm();
          this.route.snapshot.parent.data.dso = rd;
        }
      });
    }
}
