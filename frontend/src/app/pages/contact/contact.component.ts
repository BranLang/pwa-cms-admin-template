import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/filled-button.js';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="contact-page">
      <h1>{{ 'menu.contact' | translate }}</h1>
      <div class="content">
        <div class="contact-info">
          <h3>JUST SK, s.r.o.</h3>
          <p>Viničná 609</p>
          <p>951 71 Sľažany</p>
          <p>Slovensko</p>
          <br>
          <p>IČO: 36736449</p>
          <p>DIČ: SK2022323160</p>
          <br>
          <p>Pavol Just, konateľ: 0905 431 240</p>
        </div>

        <div class="map-placeholder">
          <!-- TODO: Add a real map here -->
          <p>Map will be here</p>
        </div>
      </div>

      <div class="contact-form">
        <h2>{{ 'contact.form.title' | translate }}</h2>
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <md-outlined-text-field label="Name" [value]="contactForm.controls.name.value" (input)="contactForm.controls.name.setValue($event.target.value)"></md-outlined-text-field>
          <md-outlined-text-field label="Email" type="email" [value]="contactForm.controls.email.value" (input)="contactForm.controls.email.setValue($event.target.value)"></md-outlined-text-field>
          <md-outlined-text-field label="Message" type="textarea" rows="5" [value]="contactForm.controls.message.value" (input)="contactForm.controls.message.setValue($event.target.value)"></md-outlined-text-field>

          <md-filled-button type="submit" [disabled]="contactForm.invalid">Submit</md-filled-button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .contact-info {
      background-color: var(--md-sys-color-surface-container-lowest);
      padding: 2rem;
      border-radius: 8px;
    }
    .map-placeholder {
      background-color: var(--md-sys-color-surface-container-lowest);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contact-form {
      max-width: 800px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  protected contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      // Here you would typically send the data to a backend service
      this.contactForm.reset();
    }
  }
}
