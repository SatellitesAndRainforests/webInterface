import { Image } from './Image';

export interface Capture {

  id?: number;
  time: string;
  species: string; 
  idStatus: string;
  notes: string;
  temperature: number;
  humidity: number;
  moonPhase: string;
  longitude: number;
  latitude: number;
  geolocation?: string;
  images: Image[];


}
