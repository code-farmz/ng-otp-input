import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp: string;
  showOtpComponent = true;

  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    },
    placeholder: "-"
  };
  onOtpChange(otp) {
    this.otp = otp;
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
