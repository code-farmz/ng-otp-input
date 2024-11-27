import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NgOtpInputComponent, FormsModule, NgIf]
})
export class AppComponent {
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
  onOtpChange(otp) {
    console.log(otp);
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
    if(this.focusToFirstElementAfterValueUpdate){
      let eleId=this.ngOtpInput.getBoxId(0);
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
