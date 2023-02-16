// https://openlayers.org/en/latest/examples/geojson-vt.html
// https://openlayers.org/en/latest/examples/gpx.html
// https://openlayers.org/en/latest/examples/icon-sprite-webgl.html

import { Component, OnInit } from '@angular/core';
// import { UiService } from '../../services/ui.service';


import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Group from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import VectorImage from 'ol/layer/VectorImage';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import {FullScreen, ScaleLine, defaults as defaultControls} from 'ol/control';
import KML from 'ol/format/KML';
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';

import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {Fill, Style} from 'ol/style';
import {useGeographic} from 'ol/proj';

import { Point } from 'ol/geom';
import { createStringXY } from 'ol/coordinate';

useGeographic();




const style = new Style({
  fill: new Fill(),
});

const discoverAmphibians = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url:  'https://dev-tiles.mol.org/0.x/tiles/patterns/discoveries/3857/{z}/{x}/{y}.mvt?taxa=amphibians',
  }),
  style: function (feature) {
    style.getFill().setColor([0, 0, 255, feature.get('pvalue') * 100]);
    return style;
  },
  visible: false,
});
const discoverBirds = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url:  'https://dev-tiles.mol.org/0.x/tiles/patterns/discoveries/3857/{z}/{x}/{y}.mvt?taxa=birds'
  }),
  style: function (feature) {
    style.getFill().setColor([0, 0, 255, feature.get('pvalue') * 100]);
    return style;
  },
  visible: false,
});
const discoverReptiles = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url:  'https://dev-tiles.mol.org/0.x/tiles/patterns/discoveries/3857/{z}/{x}/{y}.mvt?taxa=reptiles'
  }),
  style: function (feature) {
    style.getFill().setColor([0, 0, 255, feature.get('pvalue') * 100]);
    return style;
  },
  visible: false,
});
const discoverMammals = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url:  'https://dev-tiles.mol.org/0.x/tiles/patterns/discoveries/3857/{z}/{x}/{y}.mvt?taxa=mammals'
  }),
  style: function (feature) {
    style.getFill().setColor([0, 0, 255, feature.get('pvalue') * 100]);
    return style;
  },
  visible: false,
});






@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  ampToggle = false;
  birdToggle = false;
  repToggle = false;
  mamToggle = false;

  lowToggle = false;
  highToggle = false;
  tigerToggle = false;
  maoriToggle = false;
  rainforestToggle = false;

  scaleControl = new ScaleLine({
    units: 'imperial'
  });

  view = new View({
    center: [ 0, 0 ],
    zoom: 2
  });

  //--Layers -------------------------------
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
  koppenLow = new VectorImage({
    source: new Vector({
      url: '../../assets/doc.kml',
      format: new KML()
    }),
    opacity: 0.9,
    visible: false,
  })
  koppenHigh = new ImageLayer({
    source: new ImageStatic({
      url: '../../assets/koppen-high.png',
      projection: 'EPSG:4326',
      imageExtent: [ -180, -90, 180, 90 ],
      interpolate: false,
    }),
    visible: false,
    opacity: 0.9,
  })
  afGeoJson = new VectorImage({
    source: new Vector({
      url: '../../assets/KoeppenGeigerAf.geojson',
      format: new GeoJSON()
    }),
    visible: false,
  })
  tigerRange = new VectorImage({
    source: new Vector({
      url: '../../assets/currentTigerRange.geojson',
      format: new GeoJSON(  )
    }),
    visible: false,
  })
  maoriLandsNZ = new VectorImage({
    source: new Vector({
      url: '../../assets/maoriLandsNZ.geojson',
      format: new GeoJSON()
    }),
    visible: false,
  })


  stringifyFunc = createStringXY(6);

  baseLayerGroup = new Group({
    layers: [ this.openStreetMapStandard, this.openStreetMapCycling, this.worldSatellite, this.koppenLow, this.koppenHigh, this.afGeoJson, this.tigerRange, this.maoriLandsNZ, discoverAmphibians, discoverBirds, discoverReptiles, discoverMammals ]//this.centerPoint ]
  })
  //-----------------------------------------------------------------------------------
  constructor( ) {} //private uiService: UiService ) {}

  ngOnInit(): void {
    var map = new Map({
      controls: defaultControls().extend([this.scaleControl, new FullScreen()]),
      target: 'map',
      view: this.view
    });
    map.addLayer(this.baseLayerGroup);

    // map loads width slightly incorrectly without this line:
    setTimeout(() => { map.updateSize(); });

  }


  getCoordinates( event: any ){
    var center = this.view.getCenter();
    console.log(center);
    console.log( this.stringifyFunc(center) );
    var coordinates = this.stringifyFunc(center) ;

   //  this.uiService.newCenter(coordinates);

  }
























  //-----------------------------------------------------------------------------------

  mapCycling(){
    this.openStreetMapStandard.setVisible(false);
    this.worldSatellite.setVisible(false);
    this.openStreetMapCycling.setVisible(true);
  }

  mapSatellite(){
    this.openStreetMapStandard.setVisible(false);
    this.openStreetMapCycling.setVisible(false);
    this.worldSatellite.setVisible(true);
  }

  mapStandard(){
    this.openStreetMapCycling.setVisible(false);
    this.worldSatellite.setVisible(false);
    this.openStreetMapStandard.setVisible(true);
  }

  mapKoppenLow(){
    if (this.koppenLow.getVisible() === false) this.koppenLow.setVisible(true);
    else this.koppenLow.setVisible(false);
  }

  mapKoppenHigh(){
    if (this.koppenHigh.getVisible() === false) this.koppenHigh.setVisible(true);
    else this.koppenHigh.setVisible(false);
  }

  mapTiger(){
    if (this.tigerRange.getVisible() === false) this.tigerRange.setVisible(true);
    else this.tigerRange.setVisible(false);  
  }

  mapMaori(){
    if (this.maoriLandsNZ.getVisible() === false) this.maoriLandsNZ.setVisible(true);
    else this.maoriLandsNZ.setVisible(false);
  }

  mapAf(){
    if (this.afGeoJson.getVisible() === false) this.afGeoJson.setVisible(true);
    else this.afGeoJson.setVisible(false);
  }

  mapKm(){
    this.scaleControl.setUnits('metric');
  }

  mapMiles(){
    this.scaleControl.setUnits('imperial');
  }

  mapDegrees(){
    this.scaleControl.setUnits('degrees');
  }

  mapAmphibians(){
    discoverAmphibians.setVisible( !discoverAmphibians.getVisible() );
  }
  mapBirds(){
    discoverBirds.setVisible( !discoverBirds.getVisible() );
  }

  mapReptiles(){ 
    discoverReptiles.setVisible( !discoverReptiles.getVisible() );
  }

  mapMammals(){
    discoverMammals.setVisible( !discoverMammals.getVisible() );
  }



}

