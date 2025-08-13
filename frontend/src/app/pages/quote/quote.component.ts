import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="quote-page">
      <h1>{{ 'menu.pricing' | translate }}</h1>

      <form [formGroup]="quoteForm" (ngSubmit)="onSubmit()">
        <md-outlined-text-field label="Name" [value]="quoteForm.controls.name.value" (input)="quoteForm.controls.name.setValue($event.target.value)"></md-outlined-text-field>
        <md-outlined-text-field label="Email" type="email" [value]="quoteForm.controls.email.value" (input)="quoteForm.controls.email.setValue($event.target.value)"></md-outlined-text-field>
        <md-outlined-text-field label="Phone" type="tel" [value]="quoteForm.controls.phone.value" (input)="quoteForm.controls.phone.setValue($event.target.value)"></md-outlined-text-field>

        <md-outlined-select label="Product Type" [value]="quoteForm.controls.productType.value" (change)="quoteForm.controls.productType.setValue($event.target.value)">
          <md-select-option value="drevene-okna">Drevené okná</md-select-option>
          <md-select-option value="drevohlinikove-okna">Drevohliníkové okná</md-select-option>
          <md-select-option value="hlinikove-okna">Hliníkové okná</md-select-option>
          <md-select-option value="historicke-okna">Historické okná</md-select-option>
          <md-select-option value="drevene-dvere">Drevené dvere</md-select-option>
          <md-select-option value="historicke-dvere">Historické dvere</md-select-option>
          <md-select-option value="hlinikove-dvere">Hliníkové dvere</md-select-option>
          <md-select-option value="posuvne-dvere">Posuvné dvere</md-select-option>
        </md-outlined-select>

        <md-outlined-text-field label="Dimensions" [value]="quoteForm.controls.dimensions.value" (input)="quoteForm.controls.dimensions.setValue($event.target.value)"></md-outlined-text-field>
        <md-outlined-text-field label="Message" type="textarea" rows="5" [value]="quoteForm.controls.message.value" (input)="quoteForm.controls.message.setValue($event.target.value)"></md-outlined-text-field>

        <md-filled-button type="submit" [disabled]="quoteForm.invalid">Submit</md-filled-button>
      </form>
    </div>
  `,
  styles: [`
    .quote-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {
  private readonly fb = inject(FormBuilder);

  protected quoteForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    productType: ['', Validators.required],
    dimensions: [''],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.quoteForm.valid) {
      console.log('Quote form submitted:', this.quoteForm.value);
      // Here you would typically send the data to a backend service
      // For now, we just log it to the console as requested.
      this.quoteForm.reset();
    }
  }
}
