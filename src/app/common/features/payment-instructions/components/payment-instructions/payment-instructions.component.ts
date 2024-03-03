import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentInstructionsViewModel } from '@features/payment-instructions/models/view';

@Component({
  selector: 'kv-payment-instructions',
  templateUrl: './payment-instructions.component.html',
  styleUrls: ['./payment-instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInstructionsComponent {
  @Input() public instructions: PaymentInstructionsViewModel[];

  public expandedInstruction = false;
  public expandedInstructionId: number | null = null;

  public onExpand(): void {
    this.expandedInstruction = !this.expandedInstruction;
  }

  public onExpandInstruction(instructionId): void {
    this.expandedInstructionId = instructionId === this.expandedInstructionId ? null : instructionId;
  }
}
