import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as firebase from "firebase/app";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

let config: {
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string
} = {
  apiKey: "AIzaSyCW-AGtS2JaBzgQ16Jw2cFQ2C74yV6vTDQ",
  authDomain: "todo-75544.firebaseapp.com",
  databaseURL: "https://todo-75544.firebaseio.com",
  projectId: "todo-75544",
  storageBucket: "todo-75544.appspot.com",
  messagingSenderId: "664809859647"
};
firebase.initializeApp(config);