import { Action } from 'redux';
import {AppState, ParkingAttempt} from './model';
import {AppActions, ParkingAttemptLoadAction} from './action';

export function rootReducer(lastState: AppState, action: Action): AppState {

  switch (action.type) {
    case AppActions.PARKING_ATTEMPT_LOAD_ACTION:
      lastState.parkingAttempts = (action as ParkingAttemptLoadAction).payload;
    default:
  }
  // ensure angular change detection is triggered
  let newState = Object.assign({}, lastState);
  return newState;
}
