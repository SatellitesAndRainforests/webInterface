import { Component, OnInit } from '@angular/core';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { faListOl } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:String = "Rainforest Information System";

    filmIcon = faPhotoFilm;
  sunIcon = faSun;
  windowIcon = faWindowRestore
  listIcon = faListOl


  constructor( ) {
  } 
  ngOnInit(): void {}








}











