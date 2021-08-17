import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/Classes/auth.guard";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {FacebookPageComponent} from "./facebook-page/facebook-page.component";
import {GooglePageComponent} from "./google-page/google-page.component";

const routes: Routes = [
  {
    path:'', component:AuthLayoutComponent, children:[
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component:LoginPageComponent},
      {path: 'register', component:RegisterPageComponent}

    ]
  },
  {
    path:'', component:SiteLayoutComponent, canActivate:[AuthGuard], children:[
      {path: 'overview', component: OverviewPageComponent},
      {path: 'facebook', component: FacebookPageComponent},
      {path: 'google', component: GooglePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
