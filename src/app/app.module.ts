import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import capacitorConfig from '../../capacitor.config';

import { PlainprofileComponentModule } from './components/plainprofile/plainprofile.module';
import { LoginbuttonComponentModule } from './components/loginbutton/loginbutton.module';
import { LogoutbuttonComponentModule } from './components/logoutbutton/logoutbutton.module';

import { AuthConfig, AuthModule } from '@auth0/auth0-angular';
import { TraxtrapModule } from './traxtrap/traxtrap.module';
import { domain, clientId, callbackUri } from './auth.config';


const authConfig: AuthConfig = {
  domain,
  clientId,
  redirectUri: callbackUri,
  /* Uncomment the following lines for better support  in browers like Safari where third-party cookies are blocked.
    See https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options for risks.
  */
  // cacheLocation: "localstorage",
  // useRefreshTokens: true
};

const config: SocketIoConfig = { url: 'http://74.208.145.99:3009', options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PlainprofileComponentModule, LoginbuttonComponentModule, LogoutbuttonComponentModule,
    AuthModule.forRoot(authConfig),
    TraxtrapModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
