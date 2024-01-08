import { Component } from '@angular/core';
import {
  MediaViewerImageComponent as BaseComponent
} from '../../../../../../app/item-page/media-viewer/media-viewer-image/media-viewer-image.component';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MediaViewerItem } from '../../../../../../app/core/shared/media-viewer-item.model';

@Component({
  selector: 'ds-media-viewer-image',
  // templateUrl: './media-viewer-image.component.html',
  templateUrl: '../../../../../../app/item-page/media-viewer/media-viewer-image/media-viewer-image.component.html',
  // styleUrls: ['./media-viewer-image.component.scss'],
  styleUrls: ['../../../../../../app/item-page/media-viewer/media-viewer-image/media-viewer-image.component.scss'],
})
export class MediaViewerImageComponent extends BaseComponent {
  convertToGalleryImage(medias: MediaViewerItem[]): NgxGalleryImage[] {
    const mappedImages = [];
    for (const image of medias) {
      if (image.format === 'image') {
        mappedImages.push({
          small: image.thumbnail
            ? image.thumbnail
            : this.thumbnailPlaceholder,
          medium: image.thumbnail
            ? image.thumbnail
            : this.thumbnailPlaceholder,
          // big: image.bitstream._links.content.href,
          big: image.thumbnail
          ? image.thumbnail
          : this.thumbnailPlaceholder,
        });
      }
    }
    return mappedImages;
  }
}
