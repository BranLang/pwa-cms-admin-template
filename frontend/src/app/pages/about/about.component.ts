import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTabsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  selectedTab = signal(0);

  onTabChange(event: { index: number }) {
    this.selectedTab.set(event.index);
  }
}
