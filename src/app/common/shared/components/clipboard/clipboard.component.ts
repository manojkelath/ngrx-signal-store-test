import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'kv-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
  standalone: true,
  imports: [CommonModule, ClipboardModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardComponent {
  @Input()
  public copyText: string;

  public isCopied: boolean;
  private timeOut: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onCopySuccess(): void {
    this.isCopied = true;

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.isCopied = false;
      this.changeDetectorRef.markForCheck();
    }, 1000);
  }
}
