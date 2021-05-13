import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { addCoinReducer } from './reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { DownloaderComponent } from './downloader/downloader.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { FinalComponent } from './final/final.component';
import { DisplayComponent } from './display/display.component';
import{start} from './assets/custom.js';
import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RxReactiveFormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    StoreModule.forRoot({ blockchain: addCoinReducer }),
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
    })
  ],
  declarations: [
    AppComponent,

    DownloaderComponent,
    FinalComponent,
    HeroesComponent,
    MessagesComponent,
    DisplayComponent
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
