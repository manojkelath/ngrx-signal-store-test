import { createActionGroup, emptyProps } from '@ngrx/store';

export const AcpCodeActions = createActionGroup({
  source: 'ACP Code',
  events: {
    Clear: emptyProps(),
  },
});
