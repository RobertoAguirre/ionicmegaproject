import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(public auth: AuthService) {}
/*   login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  } */

}
