import { Component, OnInit } from '@angular/core';
import {
  MediaViewerComponent as BaseComponent
} from '../../../../../app/item-page/media-viewer/media-viewer.component';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { filter, take } from 'rxjs/operators';
// import { BitstreamDataService } from '../../../../../app/core/data/bitstream-data.service';
import { PaginatedList } from '../../../../../app/core/data/paginated-list.model';
import { RemoteData } from '../../../../../app/core/data/remote-data';
import { BitstreamFormat } from '../../../../../app/core/shared/bitstream-format.model';
import { Bitstream } from '../../../../../app/core/shared/bitstream.model';
import { Item } from '../../../../../app/core/shared/item.model';
// import { MediaViewerItem } from '../../../../../app/core/shared/media-viewer-item.model';
import { getFirstSucceededRemoteDataPayload } from '../../../../../app/core/shared/operators';
// import { hasValue } from '../../../../../app/shared/empty.util';
// import { followLink } from '../../../../../app/shared/utils/follow-link-config.model';
// import { MediaViewerConfig } from '../../../../../config/media-viewer-config.interface';
// import { environment } from '../../../../../environments/environment';
// import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'ds-media-viewer',
  // templateUrl: './media-viewer.component.html',
  templateUrl: '../../../../../app/item-page/media-viewer/media-viewer.component.html',
  // styleUrls: ['./media-viewer.component.scss'],
  styleUrls: ['../../../../../app/item-page/media-viewer/media-viewer.component.scss'],
})
export class MediaViewerComponent extends BaseComponent implements OnInit {
  // @Input() item: Item;

  // @Input() mediaOptions: MediaViewerConfig = environment.mediaViewer;

  ngOnInit(): void {
    const types: string[] = [
      ...(this.mediaOptions.image ? ['image'] : []),
      ...(this.mediaOptions.video ? ['audio', 'video'] : []),
    ];
    // this.thumbnailsRD$ = this.loadRemoteData('THUMBNAIL');
    this.thumbnailsRD$ = this.loadRemoteData('BRANDED_PREVIEW');
    // this.previewRD$ = this.loadRemoteData('BRANDED_PREVIEW');
    this.subs.push(this.loadRemoteData('ORIGINAL').subscribe((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) => {
      if (bitstreamsRD.payload.page.length === 0) {
        this.isLoading = false;
        this.mediaList$.next([]);
      } else {
        this.subs.push(this.thumbnailsRD$.subscribe((thumbnailsRD: RemoteData<PaginatedList<Bitstream>>) => {
          for (
            let index = 0;
            index < bitstreamsRD.payload.page.length;
            index++
          ) {
            this.subs.push(bitstreamsRD.payload.page[index].format
              .pipe(getFirstSucceededRemoteDataPayload())
              .subscribe((format: BitstreamFormat) => {
                const mediaItem = this.createMediaViewerItem(
                  bitstreamsRD.payload.page[index],
                  format,
                  thumbnailsRD.payload && thumbnailsRD.payload.page[index]
                );
                if (types.includes(mediaItem.format)) {
                  this.mediaList$.next([...this.mediaList$.getValue(), mediaItem]);
                } else if (format.mimetype === 'text/vtt') {
                  this.captions$.next([...this.captions$.getValue(), bitstreamsRD.payload.page[index]]);
                }
              }));
          }
          this.isLoading = false;
        }));
      }
    }));
  }
  
}
