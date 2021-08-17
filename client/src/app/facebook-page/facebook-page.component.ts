import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-facebook-page',
  templateUrl: './facebook-page.component.html',
  styleUrls: ['./facebook-page.component.css']
})










export class FacebookPageComponent implements OnInit {

  picture:any;


  login() {

    FB.login(response => {
      if(response.authResponse) console.log(response.authResponse.accessToken);
      else console.log('Cancelled authorization');
    }, {scope: 'user_photos'});
    this.statusLN();
  }



  statusLN(){
    FB.getLoginStatus(response => {
      if(response.status === 'connected') console.log('Logged in');
      else console.log('Logged out');
    });
  }

  loadPicture(){
    FB.api('/me?fields=picture.height(9999)', response => {
      console.log(response);
      // @ts-ignore
      localStorage.setItem('FacebookPhoto', response.picture.data.url)

      // @ts-ignore
      console.log('Facebook photo URL: '+ response.picture.data.url)

    });
  }


  getPicture(){
    this.picture=localStorage.getItem('FacebookPhoto')
  }


  logout(){
    this.getPicture();
    FB.logout(response => {
      console.log('Logged out');

    })
}

  clearePic(){
    this.picture=null;
    localStorage.removeItem('FacebookPhoto')
  }












  fbLibrary() {
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '681114669951835',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }



  constructor() { }

  ngOnInit(): void {
    this.fbLibrary();
    this.getPicture();
  }

}

