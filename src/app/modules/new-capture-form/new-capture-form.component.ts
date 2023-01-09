import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Capture } from '../../Capture';
import { Image } from '../../Image';
import { CaptureService } from '../../services/capture.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';


@Component({
  selector: 'app-new-capture-form',
  templateUrl: './new-capture-form.component.html',
  styleUrls: ['./new-capture-form.component.css']
})
export class NewCaptureFormComponent implements OnInit {

  uploadStatus:string = "";

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

  constructor(private uiService: UiService, private captureService: CaptureService, private sanitizer: DomSanitizer ) {

    this.subscription = this.uiService.onNewCenter().subscribe( value => {
      var coords = value.split(",");
      this.lon = +coords[0];
      this.lat = +coords[1];
    });

  }

  ngOnInit(): void {
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


    this.captureService.addCapture(formData).subscribe( (response) => this.uploadStatus = "response"  );   //.subscribe( () => capturesComponent.captures.unshift(newCapture) );

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

  }






}
