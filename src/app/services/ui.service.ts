import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Capture } from '../Capture';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  subject1 = new Subject<any>();
  centerCoordinates: String = "";

  constructor() { }

  onNewCenter(): Observable<any> {
    return this.subject1.asObservable();
  }

  newCenter( coordinates: String ) {
    this.centerCoordinates = coordinates; 
    this.subject1.next(this.centerCoordinates);
  }







}




























