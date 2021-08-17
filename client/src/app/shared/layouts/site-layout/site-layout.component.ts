import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url:'/overview', name: 'Home'},
    {url:'/facebook', name:'Facebook'},
    {url:'/google', name:'Google'}
  ]

  constructor(private auth: AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    // @ts-ignore
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }
}
