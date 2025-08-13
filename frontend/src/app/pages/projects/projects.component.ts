import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../../services/language.service';

interface Project {
  id: string;
  title: { sk: string; en: string };
  description: { sk: string; en: string };
  image: string;
  width: number;
  height: number;
}

import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgOptimizedImage, ImageGalleryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="projects-page">
      <h1>{{ 'menu.projects' | translate }}</h1>

      @if (images$ | async; as images) {
        <app-image-gallery [images]="images"></app-image-gallery>
      }
    </div>
  `,
  styles: [`
    .projects-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  protected readonly lang = this.languageService.language;
  protected readonly projects$: Observable<Project[]> = this.http.get<Project[]>('api/projects');
  protected readonly images$ = this.projects$.pipe(
    map(projects => projects.map(p => ({
      src: p.image,
      alt: p.title[this.lang()],
      width: p.width,
      height: p.height
    })))
  );
}
