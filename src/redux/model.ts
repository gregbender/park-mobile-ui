import { Action } from 'redux';
export interface AppState {
  parkingAttempts: ParkingAttempt[],
  iii: true
}


export interface ParkingAttempt {
  id: string;
  upVotes: number;
  downVotes: number;
}

export const INITIAL_STATE: AppState = {
  parkingAttempts: [],
  iii: true
};

