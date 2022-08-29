import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutbuttonComponent } from './logoutbutton.component';
@NgModule({  
    imports: [
      CommonModule,

    ],
    declarations: [LogoutbuttonComponent],
    exports: [LogoutbuttonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class LogoutbuttonComponentModule { }
  