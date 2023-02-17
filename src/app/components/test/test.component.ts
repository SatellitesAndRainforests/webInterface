import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

//import { CaptureIn } from '../../CaptureIn';
//import { ImageIn } from '../../ImageIn';

//import { CaptureService } from '../../services/capture.service'
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  {
}
/*
  dColumns: string[] = ['id'];
  dSource!: MatTableDataSource<CaptureIn>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private captureService: CaptureService ) {}

  ngOnInit() {
    this.getCaptures();
  }


  getCaptures() :void  {
    this.captureService.getCapturesNew().subscribe(
      (response: CaptureIn[]) => {
        this.dSource = new MatTableDataSource<CaptureIn>(response);
        this.dSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => { alert(error.message + "\n \nIs the server running ?"); }  );
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


const TD:CaptureIn[] = [ { "id": 123, "time": "2022-12-26T20:48", "species": "Species", "idStatus": "identified", "notes": "notes notes notes", "temperature": 99, "humidity": 100, "moonPhase": "new moon", "longitude": 7.7777, "latitude": -90, "images": [ { "id": 123, "capture_id": 123, "fileURL": "image_created:_2023:01:31:20:48:29__filename:_butterfly.png", "imageFile": null } ] }, 
  
  { "id": 124, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 

  { "id": 125, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 

  { "id": 126, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 

  { "id": 127, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 

  { "id": 128, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 

  { "id": 129, "time": "2023-02-01T00:20", "species": "unknown", "idStatus": "unidentified", "notes": "This is a note", "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.38281, "latitude": 0.7031, "images": [ { "id": 124, "capture_id": 124, "fileURL": "image_created:_2023:02:01:00:21:15__filename:_18:47:27s__21:01:2023__2.0c__98.3h__newMoon.jpg", "imageFile": null } ] }, 




{ "id": 125, "time": null, "species": "unknown", "idStatus": "unidentified", "notes": null, "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 0.1, "latitude": -0.3515, "images": [ { "id": 125, "capture_id": 125, "fileURL": "image_created:_2023:02:17:16:19:47__filename:_payPal.png", "imageFile": null } ] }, { "id": 126, "time": null, "species": "unknown", "idStatus": "unidentified", "notes": null, "temperature": 0, "humidity": 0, "moonPhase": null, "longitude": 7.7777, "latitude": -90, "images": [ { "id": 126, "capture_id": 126, "fileURL": "image_created:_2023:02:17:21:13:35__filename:_payPal.png", "imageFile": null } ] } ];


*/
























