import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="about-page">
      <h1>{{ 'menu.about' | translate }}</h1>
      <div class="content">
        <p>{{ 'about.company' | translate }}</p>
        <p>{{ 'about.services' | translate }}</p>
        <p>{{ 'about.how' | translate }}</p>
        <p>{{ 'about.certs' | translate }}</p>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      color: var(--mat-app-text-color, #333);
      margin-bottom: 2rem;
      font-size: 2.5rem;
      font-weight: 600;
    }
    
    .content p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--mat-app-text-color, #666);
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
