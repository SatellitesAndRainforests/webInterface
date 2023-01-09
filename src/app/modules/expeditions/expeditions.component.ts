import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.css']
})
export class ExpeditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  changeImage(image:string) {

    document.getElementById('image')!.setAttribute('src','/assets/street-fighter/' + image + '.png');
    document.getElementById('location-name')!.innerText = image.charAt(0).toUpperCase() + image.slice(1);;

  }





}














































