import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputComponent } from './components/ng-otp-input/ng-otp-input.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { KeysPipe } from './pipes/keys.pipe';
@NgModule({
  declarations: [NgOtpInputComponent, KeysPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NgOtpInputComponent
  ],
  providers:[KeysPipe]
})
export class NgOtpInputModule { }
