# ng-otp-input
[![Npm Version](https://img.shields.io/badge/npm-v1.4.2-blue.svg)](https://www.npmjs.com/package/ng-otp-input) 

A fully customizable, one-time password input component for the web built with Angular.

![GIPHY](https://media.giphy.com/media/TdpKuX7H1KBvvR2Hpu/giphy.gif)

<a href="https://stackblitz.com/github/code-farmz/ng-otp-input" target="_blank">Stackbliz Demo</a>
# Installation
```
npm install --save ng-otp-input
```
# Usage
Add NgOtpInputModule to imports `app.module.ts` something like

    import { BrowserModule } from  '@angular/platform-browser';
    import { NgModule } from  '@angular/core';
    import { AppComponent } from  './app.component';
    import { NgOtpInputModule } from  'ng-otp-input';
    
        @NgModule({
        declarations: [AppComponent],
        imports: [ BrowserModule,
        NgOtpInputModule],
        bootstrap: [AppComponent]
        })

Add component to your page:
  
  

    <ng-otp-input  (onInputChange)="onOtpChange($event)"  [config]="{length:5}"></ng-otp-input>

# API

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Required</th>
<th>default</th>
<th>Description</th>
</tr>
<tr>
<td>Config</td>
<td>object</td>
<td>true</td>
<td>{length:4}</td>
<td>various configuration options to customize the component</td>
</tr>
<tr>
<td>onOtpChange</td>
<td>function</td>
<td>true</td>
<td>--</td>
<td>Function that will receive the otp</td>
</tr>
</table>

**Config options**
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
<td>Style applied to each input.Check [ngStyles](https://angular.io/api/common/NgStyle) for more info.</td>
</tr>
<tr>
<td>inputClass</td>
<td>string</td>
<td>false</td>
<td>--</td>
<td>Class applied to each input.</td>
</tr>
<tr>
<td>ContainerClass</td>
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
<td>Style applied to container element.Check [ngStyles](https://angular.io/api/common/NgStyle) for more info.</td>
</tr>
<tr>
<tr>
<td>allowNumbersOnly</td>
<td>bool</td>
<td>false</td>
<td>--</td>
<td>set true to allow only numbers as input</td>
</tr>
<td>allowKeyCodes</td>
<td>string[]</td>
<td>false</td>
<td>--</td>
<td>By default numbers alphabets and _ - are allowed.Y
ou can define other key codes if needed.</td>
</tr>
<tr><td colspan="5"></td></tr>
</table>

## Contributing

Feel free to open [issues](https://github.com/code-farmz/ng-otp-input/issues/new) and [pull requests](https://github.com/code-farmz/ng-otp-input/compare)! 


## License

MIT




