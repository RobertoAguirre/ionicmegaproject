import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginbuttonComponent } from './loginbutton.component';
@NgModule({  
    imports: [
      CommonModule,

    ],
    declarations: [LoginbuttonComponent],
    exports: [LoginbuttonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class LoginbuttonComponentModule { }
  