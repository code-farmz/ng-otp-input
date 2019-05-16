import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  otp:string;
  inputStyles={
    'width':'50px',
    'height':'50px'
  }
  onOtpChange(otp){
    this.otp=otp;
  }
}
