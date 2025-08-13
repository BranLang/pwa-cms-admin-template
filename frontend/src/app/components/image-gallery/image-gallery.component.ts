import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import '@material/web/dialog/dialog.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
import { MdDialog } from '@material/web/dialog/dialog.js';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="gallery-grid">
      @for (image of images; track image.src) {
        <img [ngSrc]="image.src" [width]="image.width" [height]="image.height" [alt]="image.alt" (click)="openLightbox(image)" (keydown.enter)="openLightbox(image)" tabindex="0" />
      }
    </div>

    <md-dialog #lightbox>
      <div slot="headline">Image</div>
      <div slot="content">
        @if (selectedImage) {
          <img [ngSrc]="selectedImage.src" [width]="selectedImage.width" [height]="selectedImage.height" [alt]="selectedImage.alt" />
        }
      </div>
      <div slot="actions">
        <md-icon-button (click)="closeLightbox()">
          <md-icon>close</md-icon>
        </md-icon-button>
      </div>
    </md-dialog>
  `,
  styles: [`
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    img {
      cursor: pointer;
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    md-dialog img {
      max-width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleryComponent {
  @Input() images: Image[] = [];
  @ViewChild('lightbox') lightbox!: ElementRef<MdDialog>;

  selectedImage: Image | null = null;

  openLightbox(image: Image) {
    this.selectedImage = image;
    this.lightbox.nativeElement.show();
  }

  closeLightbox() {
    this.lightbox.nativeElement.close();
    this.selectedImage = null;
  }
}
