import { SafeUrl } from "@angular/platform-browser";

export interface Image {

  id?: number;
  capture_id?: number;
  fileURL?: string;
  file: File;
  url: SafeUrl;


}
