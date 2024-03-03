import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionCreatorType<TActionProps> = ActionCreator<
  string,
  (props: TActionProps) => TActionProps & TypedAction<string>
>;
