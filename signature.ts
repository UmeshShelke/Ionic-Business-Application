import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController} from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import { Platform } from 'ionic-angular';
import {HomePage} from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FilePath } from '@ionic-native/file-path';
import { ToastController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { LoginPage} from '../login/login';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

 
  public photos : any;
  base64Image:any;
  lastImage;
  imagePath;
  selectedImagePath;
  targetWidth :400;
  targetHeight:400;
  
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200,
     'quality': 100,
     'penColor': "rgb(66, 133, 244)",
    

      'destinationType': this.camera.DestinationType.DATA_URL,
      'saveToPhotoAlbum': true,
      'correctOrientation': true,
      //mediaType: 2
      'encodingType': this.camera.EncodingType.JPEG,
      'mediaType': this.camera.MediaType.PICTURE,
      'allowEdit' : true,
      'targetHeight':800,
      'targetwidth' :800,
      
  };
 public signatureImage : string;
 public tempPath : string;
  constructor(public navCtrl: NavController,private camera : Camera,public renderer: Renderer,private diagnostic: Diagnostic,public platform:Platform,private filePath: FilePath,private toastCtrl: ToastController,imageViewerCtrl: ImageViewerController,private androidPermissions: AndroidPermissions) {
    
    this.androidPermissions.requestPermissions(
                    [
                    this.androidPermissions.PERMISSION.CAMERA, 
                    this.androidPermissions.PERMISSION.GET_ACCOUNTS, 
                      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
                      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
                    ]
                  );
  }

 
   ngAfterViewInit() {
    console.log("signature on conole");
    this.signaturePad.clear();
   this.canvasResize();
   this.perform();
  }
   ngOnInit() {
    this.photos = [];
  }

  drawCancel() {
    this.navCtrl.push(HomePage);
  }

   drawComplete() {
  

    this.tempPath = this.signaturePad.toDataURL();
    console.log(this.tempPath);
    this.navCtrl.push(LoginPage, {tempPath: this.tempPath});
  
  }

  drawClear() {
    this.signaturePad.clear();
  }

  
 canvasResize() {
  let canvas = document.querySelector('canvas');

  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  this.signaturePad.set('minWidth', 1);
   this.signaturePad.set('canvasWidth', canvas.offsetWidth * ratio);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight * ratio);
    canvas.getContext("2d").scale(ratio, ratio);
 }

  public  takePicture(sourceType, DestinationType) {
    var options = {
      quality: 100,
      
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      correctOrientation: true,
  
      encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     
     
      targetWidth :1000,
      targetHeight:1000,
   
     
    };


    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {            
            this.lastImage = this.createFileName();           
            this.tempPath = "data:image/jpeg;base64," + imagePath;
            this.selectedImagePath = imagePath;
           
        
          });

      } else {
       
        this.lastImage = this.createFileName();
       this.tempPath = "data:image/jpeg;base64," + imagePath;
      
     this.selectedImagePath = imagePath;
     this.signaturePad.fromDataURL(this.tempPath); // Draws signature image from data URL.
   
        this.tempPath = this.signaturePad.toDataURL(this.tempPath);  //Returns signature image as data URL 
       
      }
    }, (err) => {
    
     console.log(err);
    });
    
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
    
   perform()
      {
        var data = this.signaturePad.toData(); //Returns signature image as an array of point groups
        if (data) {
        
          data.pop(); // remove the last dot or line
         this.signaturePad.fromData(data);
      }
       }
     
    
  }
