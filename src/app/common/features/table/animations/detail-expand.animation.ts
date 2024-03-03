import { animate, state, style, transition, trigger } from '@angular/animations';

export const DETAIL_EXPAND_ANIMATION = trigger('detailExpand', [
  state('collapsed', style({ height: '0px', minHeight: '0', overflow: 'hidden' })),
  state('expanded', style({ height: '*' })),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
