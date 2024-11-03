import { Component, ViewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp: string;
  showOtpComponent = true;
  focusToFirstElementAfterValueUpdate=false;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: string) {
    this.ngOtpInput.setValue(val);
    if(this.focusToFirstElementAfterValueUpdate){
      const eleId=this.ngOtpInput.getBoxId(0);
      this.ngOtpInput.focusTo(eleId);
    }
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
