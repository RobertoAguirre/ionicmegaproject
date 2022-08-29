import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainprofileComponent } from './plainprofile.component';


@NgModule({  
    imports: [
      CommonModule,

    ],
    declarations: [PlainprofileComponent],
    exports: [PlainprofileComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class PlainprofileComponentModule { }
  