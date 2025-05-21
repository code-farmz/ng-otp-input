import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  Inject,
  forwardRef,
  Injector
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { Config } from '../../models/config';
import { KeyboardUtil } from '../../utils/keyboard-util';
import { DOCUMENT, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObjectUtil } from '../../utils/object-util';
import { OnDestroy } from '@angular/core';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-otp-input, ngx-otp-input',
  templateUrl: './ng-otp-input.component.html',
  styleUrls: ['./ng-otp-input.component.scss'],
  imports: [ReactiveFormsModule, NgIf, NgFor, NgStyle, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgOtpInputComponent),
      multi: true,
    },
  ]
})
export class NgOtpInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() config: Config = { length: 4 };
  /**
   * @deprecated formCtrl is deprecated and will be removed soon. Use `FormControl` instead.
   */
  @Input() formCtrl: FormControl;
  @Input() set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }
  @Output() onBlur = new Subject<void>();
  @Output() onInputChange = new Subject<string>();
  otpForm: FormGroup;
  currentVal: string;
  inputControls: FormControl[] = new Array(this.config.length);
  componentKey = Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);
  get inputType() {
    return this.config?.isPasswordInput
      ? 'password'
      : this.config?.allowNumbersOnly
        ? 'tel'
        : 'text';
  }
  get controlKeys() { return ObjectUtil.keys(this.otpForm?.controls) };
  private destroy$ = new Subject<void>();
  private activeFocusCount = 0;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  private _isDisabled: boolean = false;
  get formControl() {
    return this.formCtrl ?? this.inj?.get(NgControl);
  }
  constructor(@Inject(DOCUMENT) private document: Document, private inj: Injector) {
   
  }


  ngOnInit() {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.otpForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: object) => {
      ObjectUtil.keys(this.otpForm.controls).forEach((k) => {
        var val = this.otpForm.controls[k].value;
        if (val && val.length > 1) {
          if (val.length >= this.config.length) {
            this.setValue(val);
          } else {
            this.rebuildValue();
          }
        }
      });
    });
  }
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled; // Update local state
    if (this.otpForm) {
      if (isDisabled) {
        this.otpForm.disable({ emitEvent: false }); // Disable form group
      } else {
        this.otpForm.enable({ emitEvent: false }); // Enable form group
      }
    }
  }
  writeValue(value: string): void {
    this.currentVal = !this.hasVal(value) ? null : value;
    this.setValue(this.currentVal);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFocusIn() {
    this.onTouched();
    this.activeFocusCount++;
  }

  onFocusOut() {
    setTimeout(() => {
      this.activeFocusCount--;
      if (this.activeFocusCount === 0) {
        this.onTouched();
        this.onBlur.next();
      }
    }, 0);
  }

  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }
  private getControlName(idx) {
    return `ctrl_${idx}`;
  }

  onKeyDown($event, inputIdx) {
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    const nextInputId = this.getBoxId(inputIdx + 1);
    if (KeyboardUtil.ifSpacebar($event)) {
      $event.preventDefault();
      return false;
    }
    if (KeyboardUtil.ifBackspace($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }
    if (KeyboardUtil.ifDelete($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }

  }
  hasVal(val) {
    return val != null && val != undefined && (!val?.trim || val.trim() != '');
  }
  onInput($event, inputIdx) {
    let newVal = this.hasVal(this.currentVal) ? `${this.currentVal}${$event.target.value}` : $event.target.value;
    if (this.config.allowNumbersOnly && !this.validateNumber(newVal)) {
      $event.target.value = null;
      $event.stopPropagation();
      $event.preventDefault();
      this.clearInput(null, inputIdx);
      return;
    }
    if (this.ifValidKeyCode(null, $event.target.value)) {
      const nextInputId = this.getBoxId(inputIdx + 1);
      this.setSelected(nextInputId);
      this.rebuildValue();
    } else {
      $event.target.value = null;
      let ctrlName = this.getControlName(inputIdx);
      this.otpForm.controls[ctrlName]?.setValue(null);
      this.rebuildValue();
    }
  }


  onKeyUp($event, inputIdx) {
    if (KeyboardUtil.ifTab($event)) {
      inputIdx -= 1;
    }
    const nextInputId = this.getBoxId(inputIdx + 1);
    const prevInputId = this.getBoxId(inputIdx - 1);
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
  }

  validateNumber(val) {
    return val && /^[0-9]+$/.test(val);
  }

  getBoxId(idx: string | number) {
    return `otp_${idx}_${this.componentKey}`;
  }

  private clearInput(eleId: string, inputIdx) {
    let ctrlName = this.getControlName(inputIdx);
    this.otpForm.controls[ctrlName]?.setValue(null);
    if (eleId) {
      const ele = this.document.getElementById(eleId);
      if (ele && ele instanceof HTMLInputElement) {
        ele.value = null;
      }
    }
  }

  private setSelected(eleId) {
    this.focusTo(eleId);
    const ele: any = this.document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  private ifValidKeyCode(event, val?) {
    const inp = val ?? event.key;
    if (this.config?.allowNumbersOnly) {
      return this.validateNumber(inp);
    }
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      (/^[a-zA-Z0-9%*_\-@#$!]$/.test(inp) && inp.length == 1)
    );
  }

  focusTo(eleId) {
    const ele: any = this.document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  // method to set component value
  setValue(value: any) {
    if (this.config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm?.reset();
    if (!this.hasVal(value)) {
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
      setTimeout(() => {
        const containerItem = this.document.getElementById(`c_${this.componentKey}`);
        var indexOfElementToFocus = value.length < this.config.length ? value.length : (this.config.length - 1);
        let ele: any = containerItem.getElementsByClassName('otp-input')[indexOfElementToFocus];
        if (ele && ele.focus) {
          setTimeout(() => {
            ele.focus();
          }, 1);
        }
      }, 0);

    }
    this.rebuildValue();
  }

  private rebuildValue() {
    let val = null;
    ObjectUtil.keys(this.otpForm.controls).forEach(k => {
      let ctrlVal = this.otpForm.controls[k].value;
      if (ctrlVal) {
        let isLengthExceed = ctrlVal.length > 1;
        let isCaseTransformEnabled = !this.config.allowNumbersOnly && this.config.letterCase && (this.config.letterCase.toLocaleLowerCase() == 'upper' || this.config.letterCase.toLocaleLowerCase() == 'lower');
        ctrlVal = ctrlVal[0];
        let transformedVal = isCaseTransformEnabled ? this.config.letterCase.toLocaleLowerCase() == 'upper' ? ctrlVal.toUpperCase() : ctrlVal.toLowerCase() : ctrlVal;
        if (isCaseTransformEnabled && transformedVal == ctrlVal) {
          isCaseTransformEnabled = false;
        } else {
          ctrlVal = transformedVal;
        }
        if (val == null) {
          val = ctrlVal;
        } else {
          val += ctrlVal;
        }
        if (isLengthExceed || isCaseTransformEnabled) {
          this.otpForm.controls[k].setValue(ctrlVal);
        }
      }
    });
    if (this.currentVal != val) {
      this.currentVal = val;
      this.onChange(val);
      if (this.formCtrl?.setValue) {
        this.formCtrl.setValue(val);
      }
      this.onInputChange.next(val);
    }
  }


  handlePaste(e) {
    // Get pasted data via clipboard API
    let clipboardData = e.clipboardData || window['clipboardData'];
    if (clipboardData) {
      var pastedData = clipboardData.getData('Text');
    }
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData || (this.config.allowNumbersOnly && !this.validateNumber(pastedData))) {
      return;
    }
    this.setValue(pastedData);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


