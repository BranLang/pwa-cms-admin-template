import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-articles',
  imports: [CommonModule, TranslateModule],
  template: `<h1>{{ 'menu.articles' | translate }}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {}


