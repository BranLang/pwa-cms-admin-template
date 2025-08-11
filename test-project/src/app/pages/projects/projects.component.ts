import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslateModule],
  template: `<h1>{{ 'menu.projects' | translate }}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {}


