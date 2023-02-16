import {Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Capture } from '../../Capture';
import { Image } from '../../Image';
import { CaptureService } from '../../services/capture.service';
import { Subscription } from 'rxjs';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Group from 'ol/layer/Group';

import { createStringXY } from 'ol/coordinate';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['add.component.css']
})
export class AddComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '85%',
      width: '100%',     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}


@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class DialogComponent implements OnInit {

  lon?: number;
  lat?: number;

  subscription?: Subscription;

  time!:string;
  species!:string;
  idStatus!:string;
  notes!:string;
  temperature!:number;
  humidity!:number;
  moonPhase!:string;
  longitude!:number;
  latitude!:number;
  images: Image[] = [];

  public map!: Map

  view = new View({
    center: [ 0, 0 ],
    zoom: 2
  });


  ngOnInit(): void {

    setTimeout( () => {  
      this.map = new Map({
        target: 'map',
        view: this.view
      });
      this.map.addLayer(this.baseLayerGroup);
    }
    , 100);

  }

  stringifyFunc = createStringXY(6);

  getCoordinates( event: any ){
    var center = this.view.getCenter();
    // console.log(center);
    // console.log( this.stringifyFunc(center) );
    var coordinates = this.stringifyFunc(center) ;

    var coords = coordinates.split(",");
    this.lon = +coords[0];
    this.lat = +coords[1];

  }

  openStreetMapStandard = new TileLayer({
    source: new OSM(),
    visible: false,
  });
  openStreetMapCycling = new TileLayer({
    source: new OSM({
      url: 'https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
    }),
    visible: false,
  })
  worldSatellite = new TileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19
    }),
    visible: true,
  });

  baseLayerGroup = new Group({
    layers: [ this.openStreetMapStandard, this.openStreetMapCycling, this.worldSatellite ]
  })



  constructor( private captureService: CaptureService, private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<DialogComponent>) {
              }

              onFileSelected(event: any) {

                if(event.target.files) {

                  for (var i = 0; i < event.target.files.length; i++) {

                    const imageFile = event.target.files[i];

                    const image: Image = {
                      file: imageFile,
                      url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageFile))
                    }

                    this.images.push(image);
                  }
                }


              }

              onSubmit(){

                if(!this.idStatus) {
                  alert('Please select ID Status');
                  return;
                }

                if(this.idStatus === 'unidentified') {
                  this.species = 'unknown';
                }

                if( (this.idStatus === 'identified') && (!this.species) ) {
                  alert('Please enter a species name for an identified species');
                  return;
                }

                if(!this.latitude) {
                  alert('Please select Latitude');
                  return;
                }

                if(!this.longitude) {
                  alert('Please select Longitude');
                  return;
                }

                if(this.images.length === 0) {
                  alert('Must add 1 image');
                  return;
                }

                const newCapture = {
                  time: this.time,
                  species: this.species,
                  idStatus: this.idStatus,
                  notes: this.notes,
                  temperature: this.temperature,
                  humidity: this.humidity,
                  moonPhase: this.moonPhase,
                  longitude: this.longitude,
                  latitude: this.latitude,
                  images: this.images
                }

                const formData = new FormData();
                formData.append(
                  'capture',
                  new Blob([JSON.stringify(newCapture)], {type: 'application/json'}  )
                );

                for (var i = 0; i < newCapture.images.length; i++) {
                  formData.append(
                    'imageFiles',
                    newCapture.images[i].file,
                    newCapture.images[i].file.name
                  );
                }


                this.captureService.addCapture(formData).subscribe( 
                                                                   (response) => {
                                                                     alert("Sent OK:" + response );
                                                                     let blankNumber!:number;
                                                                     this.time = '';
                                                                     this.species = '';
                                                                     this.idStatus = '';
                                                                     this.notes = '';
                                                                     this.temperature = blankNumber;
                                                                     this.humidity = blankNumber;
                                                                     this.moonPhase = '';
                                                                     this.longitude = blankNumber;
                                                                     this.latitude = blankNumber;
                                                                     this.images = [];

                                                                   },
                                                                   (error: HttpErrorResponse) => {
                                                                     alert(error.message +  "\n \nIs the server running ?");
                                                                   }
                                                                  );   
              }


              onNoClick(): void {
                this.dialogRef.close();
                console.log("action");
              }





}
