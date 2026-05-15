import { Component } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#000000' });
  }

  // ngOnInit(){
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyCBGFbGzxayYtHpSiNQVtl8I-XMWO5Vf0s",
  //     authDomain: "magia-45856.firebaseapp.com",
  //     projectId: "magia-45856",
  //     storageBucket: "magia-45856.firebasestorage.app",
  //     messagingSenderId: "746195881729",
  //     appId: "1:746195881729:web:6dd9326b7fc37ee8c71500"
  //   };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // }
}

