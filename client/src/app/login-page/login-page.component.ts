import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/Services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/Classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  aSub: Subscription;


  constructor(private auth:AuthService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      })

    this.route.queryParams.subscribe((params:Params)=>{
      if(params['registered']){
        MaterialService.toast('Now you can log in using your data');
        //Тепер ви можете увійти в систему використовуючи свої дані
      } else if(params['accessDenied']){
        MaterialService.toast('Please firstly authorise in system');
        //Спочатку потрібно авторизуватися в системі
      } else if(params['sessionFailed']){
        MaterialService.toast('Please log in the system again')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      ()=>this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message);
        console.log(error)
        this.form.enable();
      }
    )
  }


}
