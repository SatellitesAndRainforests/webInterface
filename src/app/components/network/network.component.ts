import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../../services/capture.service'
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';




@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  //nightVisionCameraIsOnline:boolean = false;
  nightVisionCameraIsOnline:boolean = false;
  cameraTrapIsOnline:boolean = false;
  mobileIsOnline:boolean = false;
  liveStreamIsOn:boolean = false;
  nvCamIsCapturing = false;

  closeResult = '';

  constructor( private captureService: CaptureService, private modalService: NgbModal, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isNightVisionCameraOnline();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '85%',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // reset nvCamService.service
    });
  }



  isNightVisionCameraOnline() {
    this.captureService.isNightVisionCameraOnline().subscribe( (response: Boolean) => {
      this.nightVisionCameraIsOnline = response.valueOf();
    });
  }


  startLiveStream() {
    this.captureService.startLiveStream().subscribe( (response: Boolean) => {
      this.liveStreamIsOn = response.valueOf();
    });
  }

  startNvCamCapturing() {
    this.captureService.startNvCamCapturing().subscribe( (response: Boolean) => {
      this.nvCamIsCapturing = response.valueOf();
    });
  }

  stopNvCamCapturing() {
    this.captureService.stopNvCamCapturing().subscribe( (response: Boolean) => {
      this.nvCamIsCapturing = !response.valueOf(); //response is positive if command was successful.
    });
  }

  retrieveImages() {
    this.captureService.retrieveNvCamImages().subscribe( (response: Boolean) => {

      console.log(response.valueOf()); //response is positive if command was successful.

    });

  }

  refreshNetworkStatus() {
    this.isNightVisionCameraOnline();
    alert("Refreshed");
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', fullscreen: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {

    this.stopNvCamCapturing();

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}


@Component({
  selector: 'livestream-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}













