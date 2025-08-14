import { ChangeDetectionStrategy, Component, Input, inject, Inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleryComponent {
  @Input() images: Image[] = [];
  
  private readonly dialog = inject(MatDialog);

  openLightbox(image: Image) {
    this.dialog.open(ImageLightboxDialog, {
      data: image,
      maxWidth: '95vw',
      maxHeight: '95vh',
      panelClass: 'lightbox-dialog',
      disableClose: false,
      hasBackdrop: true
    });
  }
}

// Separate dialog component for the lightbox
@Component({
  selector: 'app-image-lightbox-dialog',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  templateUrl: './image-lightbox-dialog.component.html',
  styleUrls: ['./image-lightbox-dialog.component.scss']
})
export class ImageLightboxDialog {
  constructor(
    public dialogRef: MatDialogRef<ImageLightboxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Image
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  downloadImage(): void {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = this.data.src;
    link.download = this.data.alt || 'image';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
