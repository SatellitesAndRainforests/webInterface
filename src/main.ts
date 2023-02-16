import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { enableDebugTools } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(module => {
  let applicationRef = module.injector.get(ApplicationRef);
  let appComponent = applicationRef.components[0];
  enableDebugTools(appComponent);
}).catch(err => console.error(err));
