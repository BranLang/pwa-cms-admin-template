import { ChangeDetectionStrategy, Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeService } from '../services/home.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly data = inject(HomeService).getHomeData();
  protected readonly lang = inject(LanguageService).language;
}


