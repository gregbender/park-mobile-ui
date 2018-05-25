import { HttpClient } from '@angular/common/http';
import {Component, Injectable} from '@angular/core';
import {AppState, ParkingAttempt} from '../../redux/model';
import {HTTP} from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import {NgRedux} from '@angular-redux/store';
import {AppActions} from '../../redux/action';
/*
  Generated class for the ParkingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingProvider {

  constructor(public http: HttpClient, public ngRedux: NgRedux<AppState>, public appActions: AppActions) {
    console.log('Hello ParkingProvider Provider');
  }

  public getAllParkingAttempts(): Promise<ParkingAttempt[]>{

    return this.http.get('http://localhost:8080/api/parkingAttempts/all')
      .toPromise()
      .then((data: any) => {
        this.ngRedux.dispatch(this.appActions.loadParkingAttempts(data));
        return data;
      })
      .catch(err => {
        console.log('Error', err);
        return err;
      })
  }
}
