import { createActionGroup, emptyProps } from '@ngrx/store';

export const TermsToSubscribePageActions = createActionGroup({
  source: 'Terms to subscribe page',
  events: {
    'Open overlay': emptyProps(),
    'Overlay initiated': emptyProps(),
    'Overlay closed': emptyProps(),
  },
});
