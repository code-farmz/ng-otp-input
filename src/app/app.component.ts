import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp: string = '';
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  otpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.otpForm = this.formBuilder.group({
      otp: [this.config.placeholder.repeat(this.config.length),
        Validators.minLength(this.config.length)]
    });
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      this.ngOtpInput.setDisabledState(!this.ngOtpInput.otpForm.disabled);
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    this.otpForm.reset({ otp: this.config.placeholder.repeat(this.config.length) })
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
