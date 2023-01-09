import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Capture } from '../Capture';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
} 

@Injectable({
  providedIn: 'root'
})
export class CaptureService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getCaptures(): Observable<Capture[]> {
    const url = `${this.apiServerUrl}/find/every`
    return this.http.get<Capture[]>(url);
  }

  deleteCapture(capture:Capture): Observable<Capture> {
    const url = `${this.apiServerUrl}/delete/${capture.id}`;
    return this.http.delete<Capture>(url);
  }

  updateCapture(capture:Capture): Observable<Capture> {
    const url = `${this.apiServerUrl}/update`;
    return this.http.put<Capture>(url, capture, httpOptions);
  }

  addCapture(capture: FormData): Observable<FormData> {
    const url = `${this.apiServerUrl}/add-with-image`
    return this.http.post<FormData>(url, capture);
  }

  isNightVisionCameraOnline(): Observable<Boolean> {
    const url = `${this.apiServerUrl}/night-vision-camera`
    return this.http.get<Boolean>(url);
  }

  startLiveStream(): Observable<Boolean> {
    const url = `${this.apiServerUrl}/start-live-stream`
    return this.http.get<Boolean>(url);
  }

  startNvCamCapturing(): Observable<Boolean> {
    const url = `${this.apiServerUrl}/start-night-vision-automated-capturing`
    return this.http.get<Boolean>(url);
  }

  stopNvCamCapturing(): Observable<Boolean> {
    const url = `${this.apiServerUrl}/stop-night-vision-camera`
    return this.http.get<Boolean>(url);
  }

  retrieveNvCamImages(): Observable<Boolean> {
    const url = `${this.apiServerUrl}/retrieve-night-vision-camera-images`
    return this.http.get<Boolean>(url);
  }



}
































