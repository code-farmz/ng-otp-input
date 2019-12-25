import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput') ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
