import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import {ParkingAttempt} from './model';

export type ParkingAttemptLoadAction = FluxStandardAction<ParkingAttempt[]>;

@Injectable()
export class AppActions {
  static readonly PARKING_ATTEMPT_LOAD_ACTION = 'PARKING_ATTEMPT_LOAD_ACTION';

  @dispatch()
  loadParkingAttempts = (payload: ParkingAttempt[]): ParkingAttemptLoadAction => ({
    type: AppActions.PARKING_ATTEMPT_LOAD_ACTION,
    payload: payload
  });
}
