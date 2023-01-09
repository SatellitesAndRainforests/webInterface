import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../../services/capture.service'
import { Capture } from '../../Capture';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  captures:Capture[] = [];
  closeResult = '';

  updatingCapture !: Capture;

  species!: string;
  notes!: string;


  constructor( private captureService: CaptureService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getCaptures();
  }




  getCaptures(): void {
    this.captureService.getCaptures().subscribe(
      (response: Capture[]) => { 
        this.captures = response;
        console.log( this.captures[0].images[0].fileURL  );
      },
      /*(error: HttpErrorResponse) => { alert(error.message + "\n \nIs the server running ?"); } */ ); 
  }

  deleteCapture(capture:Capture){
    if (window.confirm('Confirm Delete ?')){
      this.captureService.deleteCapture(capture).subscribe(() => 
                                                           (this.captures = this.captures.filter((c) => c.id !== capture.id)));
    }
  }


  identify(capture:Capture) {
    this.species = capture.species;
    this.notes = capture.notes;
    this.updatingCapture = capture;
  }

  updateCapture(){ 
    this.updatingCapture.idStatus = "identified";
    this.updatingCapture.species = this.species;
    this.updatingCapture.notes = this.notes;
    this.captureService.updateCapture( this.updatingCapture ).subscribe( () => this.getCaptures()   );
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
