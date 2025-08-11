import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="contact-page">
      <h1>{{ 'menu.contact' | translate }}</h1>
      <div class="content">
        <div class="contact-info">
          <h3>JUST SK, s.r.o.</h3>
          <p>Viničná 609</p>
          <p>951 71 Sľažany</p>
          <p>Slovensko</p>
          <p>IČO: 36736449</p>
          <p>DIČ: SK2022323160</p>
          <p>Pavol Just, konateľ: 0905 431 240</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      font-weight: 600;
    }
    
    .contact-info {
      background: #f5f5f5;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #1976d2;
    }
    
    .contact-info h3 {
      color: #1976d2;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    .contact-info p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin-bottom: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {}
