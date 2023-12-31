## ng-otp-input
[![Npm Version](https://img.shields.io/badge/npm-v1.9.3-blue.svg)](https://www.npmjs.com/package/ng-otp-input) 

Angular-based, fully customizable one-time password input for seamless web integration, offering a straightforward, configurable, and user-friendly component for simple yet powerful implementation

![GIPHY](https://media.giphy.com/media/TdpKuX7H1KBvvR2Hpu/giphy.gif)

Explore the complete working <a href="https://code-farmz.github.io/ng-otp-input" target="_blank">Example</a> with all configurations

Edit the <a href="https://stackblitz.com/github/code-farmz/ng-otp-input" target="_blank">Stackbliz demo</a> to experiment with and experience firsthand how this component can be utilized.

## Installation

#### For the latest versions of Angular (V12 and above)

    npm install --save ng-otp-input
    yarn add ng-otp-input
    
#### For earlier versions of Angular, please utilize version 1.8.1

    npm install --save ng-otp-input@1.8.1
    yarn add ng-otp-input@1.8.1

## Usage
Include NgOtpInputModule in the imports section of your app.module.ts file, as shown below:

    import { BrowserModule } from  '@angular/platform-browser';
    import { NgModule } from  '@angular/core';
    import { AppComponent } from  './app.component';
    import { NgOtpInputModule } from  'ng-otp-input';
    
    @NgModule({
       declarations: [AppComponent],
       imports: [BrowserModule, NgOtpInputModule],
       bootstrap: [AppComponent]
    })


Integrate the ng-otp-input component into the app.component.html file
  
    <ng-otp-input (onInputChange)="onOtpChange($event)" [config]="{ length: 5 }"></ng-otp-input>

    or 

    <ng-otp-input [formCtrl]="YourFormControl" [config]="{ length: 5 }"></ng-otp-input>

## API

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Required</th>
<th>default</th>
<th>Description</th>
</tr>
<tr>
<td>config</td>
<td>object</td>
<td>true</td>
<td>{length:4}</td>
<td>Various configuration options to customize the component</td>
</tr>
<tr>
<td>onOtpChange</td>
<td>function</td>
<td>false</td>
<td>--</td>
<td>Function that will receive the otp.Not required if formCtrl is passed</td>
</tr>
<tr>
<td>formCtrl</td>
<td>FormControl</td>
<td>false</td>
<td>--</td>
<td>If there value will be set to the passed form control no need to subscribe to onOtpChange</td>
</tr>
<tr>
<td>setValue</td>
<td>function</td>
<td>false</td>
<td>--</td>
<td>Call setValue method of component to update component value. See example below</td>
</tr>
</table>

<u>**Config options**</u>
<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Required</th>
<th>default</th>
<th>Description</th>
</tr>

<tr>
<td>length</td>
<td>number</td>
<td>true</td>
<td>4</td>
<td>Number of OTP inputs to be rendered.</td>
</tr>
<tr>
<td>inputStyles</td>
<td>object</td>
<td>false</td>
<td>--</td>
<td>Style applied to each input.Check https://angular.io/api/common/NgStyle for more info.</td>
</tr>
<tr>
<td>inputClass</td>
<td>string</td>
<td>false</td>
<td>--</td>
<td>Class applied to each input.</td>
</tr>
<tr>
<td>containerClass</td>
<td>string</td>
<td>false</td>
<td>--</td>
<td>Class applied to container element.</td>
</tr>
<tr>
<td>containerStyles</td>
<td>object</td>
<td>false</td>
<td>--</td>
<td>Style applied to container element.Check https://angular.io/api/common/NgStyle for more info.</td>
</tr>
<tr>
<tr>
<td>allowNumbersOnly</td>
<td>bool</td>
<td>false</td>
<td>--</td>
<td>set true to allow only numbers as input</td>
</tr>
<tr>
<td>isPasswordInput</td>
<td>bool</td>
<td>false</td>
<td>--</td>
<td>set true for password type input</td>
</tr>
<tr>
<td>disableAutoFocus</td>
<td>bool</td>
<td>false</td>
<td>--</td>
<td>First input will be auto focused on component load and to next empty input on setValue excecution.Set this flag to true to prevent this behaviour</td>
</tr>
<tr>
<td>placeholder</td>
<td>string</td>
<td>false</td>
<td>--</td>
<td>input placeholder</td>
</tr>
<tr>
<td>letterCase</td>
<td>string</td>
<td>--</td>
<td>--</td>
<td>Set value to Upper or Lower to change the otp to upper case or lower case</td>
</tr>
</table>

<u>**Updating component value using setValue method**</u>

To update the component value programmatically, utilize the setValue method within your component class. For instance, if you wish to set a specific value manually...

 1. Get component reference using [@ViewChild](https://angular.io/api/core/ViewChild)  

    For version 1.7.7 and latest

        @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput:NgOtpInputComponent;

    For version older than 1.7.7
      
        <ng-otp-input #ngOtpInput></ng-otp-input> //add hash to ng-otp-input component```
        @ViewChild('ngOtpInput') ngOtpInputRef:any;

 1. call `setValue` method when you want to set the value of component like
     
        yourMethod(){
            // yourvalue can be any string or number
            this.ngOtpInputRef.setValue(yourValue);
        }

<u>**Disable inputs**</u>

Inputs can be disabled by getting the otp form instance of the component and calling disable method

1.Get the component ref in the same way as done in SetValue method above
2.Call disable method of otpForm as follow

``` this.ngOtpInputRef.otpForm.disable(); ```

<u>**Focus to Specific box**</u>

1.Get the component ref in the same way as done in SetValue method above

2.Get the box id and call ```focusTo``` method as follow

``` 
    let eleId=this.ngOtpInputRef.getBoxId(0);
    this.ngOtpInputRef.focusTo(eleId);
```

## License

[![NPM](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/code-farmz/ng-otp-input/blob/master/LICENSE)

## Contributing

Add a star to show your support and feel free to open [issues](https://github.com/code-farmz/ng-otp-input/issues/new) and [pull requests](https://github.com/code-farmz/ng-otp-input/compare)! 






