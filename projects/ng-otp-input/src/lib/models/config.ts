import { NgStyle } from '@angular/common';

export class Config {
  inputStyles?: NgStyle;
  containerStyles?: NgStyle;
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: "Upper" | "Lower";
}
