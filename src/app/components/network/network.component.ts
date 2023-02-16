import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../../services/capture.service'
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  nightVisionCameraIsOnline:boolean = false;
  cameraTrapIsOnline:boolean = false;
  mobileIsOnline:boolean = false;
  liveStreamIsOn:boolean = false;
  nvCamIsCapturing = false;


  closeResult = '';


  constructor( private captureService: CaptureService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isNightVisionCameraOnline();
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











