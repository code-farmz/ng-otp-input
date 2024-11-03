import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  Inject
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { Config } from '../../models/config';
import { KeyboardUtil } from '../../utils/keyboard-util';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'ng-otp-input',
  templateUrl: './ng-otp-input.component.html',
  styleUrls: ['./ng-otp-input.component.scss']
})
export class NgOtpInputComponent implements OnInit, AfterViewInit {
  @Input() config: Config = { length: 4 };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInputChange = new EventEmitter<string>();
  @Input() formCtrl:FormControl;
  otpForm: FormGroup;
  currentVal:string;
  inputControls: FormControl[] = new Array(this.config.length);
  componentKey =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36);

  constructor(private keysPipe: KeysPipe,@Inject(DOCUMENT) private document: Document) {}

  get inputType(){
    return this.config?.isPasswordInput
      ? 'password'
      : this.config?.allowNumbersOnly
        ? 'tel'
        : 'text';
  }

  ngOnInit() {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.otpForm.valueChanges.subscribe(()=>{
      this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
        const val = this.otpForm.controls[k].value;
        if(val && val.length>1){
          if (val.length >= this.config.length) {
            this.setValue(val);
          }else{
            this.rebuildValue();
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        const ele  = containerItem.getElementsByClassName('otp-input')[0] as HTMLElement;
        if (ele?.focus) {
          ele.focus();
        }
      }
    }
  }

  onKeyDown($event: KeyboardEvent, inputIdx: number){
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    if (KeyboardUtil.ifSpacebar($event)) {
      $event.preventDefault();
      return false;
     }
     if (KeyboardUtil.ifBackspace($event)) {
      if(!($event.target as HTMLInputElement).value){
        this.clearInput(prevInputId,inputIdx-1);
        this.setSelected(prevInputId);
      }else{
        this.clearInput(currentInputId,inputIdx);
      }
      this.rebuildValue();
      return;
    }
  }
  onInput($event){
    const newVal=this.currentVal ? `${this.currentVal}${$event.target.value}` : $event.target.value;
    if(this.config.allowNumbersOnly && !this.validateNumber(newVal)){
      $event.target.value='';
      $event.stopPropagation();
      $event.preventDefault();
      return;
    }
  }

  onKeyUp($event, inputIdx) {
    if(KeyboardUtil.ifTab($event)){
      inputIdx-=1;
    }
    const nextInputId = this.getBoxId(inputIdx + 1);
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    if (KeyboardUtil.ifRightArrow($event)) {
      $event.preventDefault();
      this.setSelected(nextInputId);
      return;
    }
    if (KeyboardUtil.ifLeftArrow($event)) {
      $event.preventDefault();
      this.setSelected(prevInputId);
      return;
    }
    if (KeyboardUtil.ifDelete($event)) {
      if(!$event.target.value){
        this.clearInput(prevInputId,inputIdx-1);
        this.setSelected(prevInputId);
      }else{
        this.clearInput(currentInputId,inputIdx);
      }
      this.rebuildValue();
      return;
    }

    if (!$event.target.value) {
      return;
    }

    if (this.ifValidKeyCode($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }

  validateNumber(val){
    return val && /^[0-9]+$/.test(val);
  }

  getBoxId(idx:string | number){
    return `otp_${idx}_${this.componentKey}`;
  }

  focusTo(eleId: string) {
    const ele = this.document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  // method to set component value
  setValue(value: string | number) {
    if (this.config.allowNumbersOnly && isNaN((value as number))) {
        return;
    }
    this.otpForm.reset();
     if (!value) {
       this.rebuildValue();
       return;
     }
     value = value.toString().replace(/\s/g, ''); // remove whitespace
     Array.from(value).forEach((c, idx) => {
          if (this.otpForm.get(this.getControlName(idx))) {
            this.otpForm.get(this.getControlName(idx)).setValue(c);
          }
     });
     if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      const indexOfElementToFocus = value.length < this.config.length ? value.length : (this.config.length - 1);
      const ele = containerItem.getElementsByClassName('otp-input')[indexOfElementToFocus] as HTMLElement;
      if (ele && ele.focus) {
        ele.focus();
      }
     }
     this.rebuildValue();
  }

  handlePaste(e) {
    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData || window['clipboardData'];
    let pastedData: string = null;
    if(clipboardData){
      pastedData = clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData || (this.config.allowNumbersOnly && !this.validateNumber(pastedData))) {
      return;
    }
    this.setValue(pastedData);
  }

  private rebuildValue() {
    let val = '';
    this.keysPipe.transform(this.otpForm.controls).forEach(k => {
      if (this.otpForm.controls[k].value) {
        let ctrlVal=this.otpForm.controls[k].value;
        const isLengthExceed=ctrlVal.length>1;
        let isCaseTransformEnabled= !this.config.allowNumbersOnly && this.config.letterCase && (this.config.letterCase.toLocaleLowerCase() === 'upper' || this.config.letterCase.toLocaleLowerCase() === 'lower');
        ctrlVal=ctrlVal[0];
        const transformedVal=isCaseTransformEnabled ? this.config.letterCase.toLocaleLowerCase() === 'upper' ? ctrlVal.toUpperCase() : ctrlVal.toLowerCase()  : ctrlVal;
        if(isCaseTransformEnabled && transformedVal === ctrlVal){
          isCaseTransformEnabled=false;
        }else{
          ctrlVal=transformedVal;
        }
        val += ctrlVal;
        if(isLengthExceed || isCaseTransformEnabled) {
         this.otpForm.controls[k].setValue(ctrlVal);
        }
      }
    });
    if(this.formCtrl?.setValue){
      this.formCtrl.setValue(val);
    }
    this.onInputChange.emit(val);
    this.currentVal=val;
  }

  private getControlName(idx) {
    return `ctrl_${idx}`;
  }

  private clearInput(eleId:string,inputIdx){
    const ctrlName=this.getControlName(inputIdx);
    this.otpForm.controls[ctrlName]?.setValue(null);
    const ele=this.document.getElementById(eleId);
    if(ele && ele instanceof HTMLInputElement){
      ele.value=null;
    }
  }

  private setSelected(eleId) {
    this.focusTo(eleId);
    const ele = this.document.getElementById(eleId) as HTMLInputElement;
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  private ifValidKeyCode(event) {
    const inp = event.key;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp)
    );
  }

}
