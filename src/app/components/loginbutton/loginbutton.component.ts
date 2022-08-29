import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginbutton',
  templateUrl: './loginbutton.component.html',
  styleUrls: ['./loginbutton.component.scss'],
})
export class LoginbuttonComponent implements OnInit {

  constructor(public auth: AuthService,private router:Router) {}
  ngOnInit() {}

  login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe((res)=>{
        if(this.auth.isAuthenticated$){
          console.log(res);
        this.router.navigate(['home']);
        }else{
          alert("not authenticated");
        }
        
      });
  }

}
