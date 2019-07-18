import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp: string;
  showOtpComponent: boolean = true;
 
  config = {
    allowNumbersOnly: false,
    length:5,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  }
  onOtpChange(otp) {
    this.otp = otp;
  }

  onConfigChange() {
    this.showOtpComponent = false;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
}
