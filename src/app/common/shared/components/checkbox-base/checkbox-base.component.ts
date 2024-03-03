import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kv-checkbox-base',
  templateUrl: './checkbox-base.component.html',
  styleUrls: ['./checkbox-base.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxBaseComponent {
  @Input()
  public disabled = false;

  @Input()
  public isChecked: boolean;

  @Input()
  public isSmall: boolean;

  @Input()
  public error: string;

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public blurred: EventEmitter<boolean> = new EventEmitter();

  public onChanged(event): void {
    this.changed.emit(event.target.checked);
  }

  public onBlur(event): void {
    this.blurred.emit(event.target.checked);
  }
}
