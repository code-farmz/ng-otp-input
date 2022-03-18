import { NgModule } from '@angular/core';
import { NgOtpInputComponent } from './components/ng-otp-input/ng-otp-input.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NgOtpInputComponent, KeysPipe],
  exports: [NgOtpInputComponent],
  providers: [KeysPipe]
})
export class NgOtpInputModule { }
