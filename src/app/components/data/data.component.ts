import { Component, Inject, OnInit } from '@angular/core';
import { CaptureService } from '../../services/capture.service'
import { Capture } from '../../Capture';
import { Image } from '../../Image';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Group from 'ol/layer/Group';




export interface DialogData {
  id: number;
  time: string;
  species: string;
  idStatus: string;
  notes: string;
  temperature: number;
  humidity: number;
  moonPhase: string;
  longitude: number;
  latitude: number;
  geolocation?: string;
  image: string;
}

export interface DialogImageData {
  imageURL: string;
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  captures:Capture[] = [];
  // displayedColumns: string[] = ['id', 'time', 'species', 'idStatus','notes','temp','humidity','moonPhase','lon','lat','images'];
  displayedColumns: string[] = ['actions', 'id', 'species', 'idStatus', 'images'];

  openedCapture!:Capture;

  constructor( private captureService: CaptureService, public dialog: MatDialog ) { }

  openDialog( capture:Capture ): void {
    const dialogRef = this.dialog.open(DialogOpenComponent, {
      height: '95%',
      width: '450px',
      data: {

        id: capture.id,
        time: capture.time,
        species: capture.species,
        idStatus: capture.idStatus,
        notes: capture.notes,
        temperature: capture.temperature,
        humidity: capture.humidity,
        moonPhase: capture.moonPhase,
        longitude: capture.longitude,
        latitude: capture.latitude,
        geolocation: capture.geolocation,

        image: capture.images[0].fileURL,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openImageLarge( imageURL:String ):void {

    const dialogImageLargeRef = this.dialog.open(DialogImageComponent, {
      data: {
        imageURL: imageURL,
      },      
    });

    dialogImageLargeRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });


  }



  ngOnInit(): void {
    this.getCaptures();
  }

  getCaptures(): void {
    this.captureService.getCaptures().subscribe(
      (response: Capture[]) => { 
        this.captures = response;
        console.log( this.captures  );
      },
      (error: HttpErrorResponse) => { alert(error.message + "\n \nIs the server running ?"); }  ); 
  }

  deleteCapture(capture:Capture) {
    if (window.confirm('Confirm Delete ?')){
      this.captureService.deleteCapture(capture).subscribe(() =>
                                                           (this.captures = this.captures.filter((c) => c.id !== capture.id)));
    }
  }

}




@Component({
  selector: 'app-open-dialog',
  templateUrl: 'dialogOpen.component.html',
  styleUrls: ['dialogOpen.component.css']
})
export class DialogOpenComponent implements OnInit {

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


  constructor( 
              public dialogRef: MatDialogRef<DialogOpenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
             ) { }

             onNoClick(): void {
               this.dialogRef.close();
               console.log("action");
             }



}



@Component({
  selector: 'app-image-dialog',
  templateUrl: 'dialogImage.component.html',
  styleUrls: ['dialogImage.component.css']
})
export class DialogImageComponent implements OnInit {

  ngOnInit(): void {}

  constructor( 
              public dialogImageLargeRef: MatDialogRef<DialogOpenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogImageData,
             ) { }

             onNoClick(): void {
               this.dialogImageLargeRef.close();
               console.log("action");
             }



}









