import {Component, OnDestroy} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppState, ParkingAttempt} from '../../redux/model';
import {DevToolsExtension, NgRedux, select} from '@angular-redux/store';
import {AppActions} from '../../redux/action';
import {Observable} from 'rxjs/Observable';
import {ParkingProvider} from '../../providers/parking/parking';
import {  LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {normalizeURL} from 'ionic-angular/es2015';
import {Base64} from '@ionic-native/base64';

declare var require;

var reduxLogger = require('redux-logger');
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  imageURI:string;
  imageFileName:any;
  @select() readonly parkingAttempts$: Observable<ParkingAttempt[]>;

  constructor(public http: HttpClient, private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,private base64: Base64, private parkingProvider:ParkingProvider, public ngRedux: NgRedux<AppState>, public appActions: AppActions, public devTools: DevToolsExtension, public navCtrl: NavController) {
    parkingProvider.getAllParkingAttempts();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.presentToast("image URI is: " + imageData);
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });

  }
  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();


    this.http.post('http://localhost:8080/api/upload', this.imageURI)
      .toPromise()
      .then((data: any) => {
        console.log('good');
        loader.dismiss();
        this.presentToast('all good');
        this.parkingProvider.getAllParkingAttempts();
        return data;
      });


  }
  voteUp(itemId) {
    this.http.get('http://localhost:8080/api/vote/'+itemId+'?type=up')
      .toPromise()
      .then((data: any) => {
        console.log('good');
        //loader.dismiss();
        this.presentToast('all good');
        this.parkingProvider.getAllParkingAttempts();
        return data;
      });
  }

  presentToast(msg) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
