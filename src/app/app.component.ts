import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NgOtpInputComponent, FormsModule, NgIf,ReactiveFormsModule,FormsModule]
})
export class AppComponent {
  otpForm:FormGroup<{
    otp:FormControl<string>
  }>=new FormGroup({
    otp:new FormControl(null)
  });
  otp: string;
  showOtpComponent = true;
  focusToFirstElementAfterValueUpdate:boolean=false;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  config :NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    separator:'-'
  };
  get controls(){return this.otpForm?.controls};
  constructor(){

  }
  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.controls.otp.setValue(val);
    if(this.focusToFirstElementAfterValueUpdate){
      let eleId=this.ngOtpInput.getBoxId(0);
      this.ngOtpInput.focusTo(eleId);
    }
  }

  toggleDisable(){
   if(this.controls.otp.disabled){
    this.controls.otp.enable();
   }else{
    this.controls.otp.disable();
   }
   this.controls.otp.updateValueAndValidity();
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
