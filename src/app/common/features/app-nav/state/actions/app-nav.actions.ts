import { createActionGroup, props } from '@ngrx/store';

export const AppNavActions = createActionGroup({
  source: 'App Navigation',
  events: {
    'External link navigated': props<{ externalLink: string }>(),
  },
});
