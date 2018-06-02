import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SignaturePage } from '../pages/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FilePath } from '@ionic-native/file-path';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignaturePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SignaturePadModule,
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignaturePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,Diagnostic,ToastController,FilePath]
})
export class AppModule {}