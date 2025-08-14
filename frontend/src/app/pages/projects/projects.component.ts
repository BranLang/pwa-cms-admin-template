import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, TranslateModule, ImageGalleryComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
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
