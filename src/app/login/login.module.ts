import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginbuttonComponentModule} from '../components/loginbutton/loginbutton.module';
import { LogoutbuttonComponentModule } from '../components/logoutbutton/logoutbutton.module';
import { PlainprofileComponentModule } from '../components/plainprofile/plainprofile.module';

@NgModule({
  imports: [
    CommonModule,
    LogoutbuttonComponentModule,
    LoginbuttonComponentModule,
    PlainprofileComponentModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
