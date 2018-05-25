import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Base64 } from '@ionic-native/base64';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ParkingProvider } from '../providers/parking/parking';
import {DevToolsExtension, NgReduxModule} from '@angular-redux/store';
import {AppActions} from '../redux/action';
import {HttpClientModule} from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

import {rootReducer} from '../redux/reducer';
import {AppState, INITIAL_STATE} from '../redux/model';
import {HTTP} from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    AppActions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParkingProvider,
    DevToolsExtension,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    Base64
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {

    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);



  }
}
