import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { tap } from 'rxjs/operators';
import capacitorConfig from '../../../../capacitor.config';
// Build the URL to return back to your app after logout
const returnTo = `${capacitorConfig.appId}://YOUR_DOMAIN/capacitor/${capacitorConfig.appId}/callback`;

@Component({
  selector: 'app-logoutbutton',
  templateUrl: './logoutbutton.component.html',
  styleUrls: ['./logoutbutton.component.scss'],
})
export class LogoutbuttonComponent  {

  // Import the AuthService module from the Auth0 Angular SDK
  constructor(public auth: AuthService) {}

   logout() {
    // Use the SDK to build the logout URL
    this.auth
      .buildLogoutUrl({ returnTo })
      .pipe(
        tap((url) => {
          // Call the logout fuction, but only log out locally
          this.auth.logout({ localOnly: true });
          // Redirect to Auth0 using the Browser plugin, to clear the user's session
          Browser.open({ url });
        })
      )
      .subscribe();
  }

}
