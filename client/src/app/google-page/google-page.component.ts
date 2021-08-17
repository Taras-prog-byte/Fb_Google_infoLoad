import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-google-page',
  templateUrl: './google-page.component.html',
  styleUrls: ['./google-page.component.css']
})
export class GooglePageComponent implements OnInit {

  auth2: any;
  // @ts-ignore
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor() { }






  profileGoogle:any;
  T:boolean=false;


  picture:any;





  prepareLoginButton() {
    // @ts-ignore
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser: { getBasicProfile: () => any; getAuthResponse: () => { (): any; new(): any; id_token: string; }; }) => {

        this.profileGoogle = googleUser.getBasicProfile();

        localStorage.setItem('GooglePhoto',this.profileGoogle.hJ)

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }



  getPicture(){
    this.picture=localStorage.getItem('GooglePhoto');
  }

  logout(){
    this.profileGoogle=null;
    localStorage.removeItem('GooglePhoto');
    this.getPicture();
    this.googleSDK();
    this.prepareLoginButton();
  }




ngOnInit() {
    this.googleSDK();
    this.getPicture();
  }

  googleSDK() {

    // @ts-ignore
    window['googleSDKLoaded'] = () => {
      // @ts-ignore
      window['gapi'].load('auth2', () => {
        // @ts-ignore
        this.auth2 = window['gapi'].auth2.init({
          client_id: '522392554037-4cmhqc6sse6f9et701kpl3edmab2ib7h.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      // @ts-ignore

      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }
}

