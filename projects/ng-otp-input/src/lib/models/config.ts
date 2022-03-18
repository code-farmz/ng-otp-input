export class Config {
  inputStyles?: { [key: string]: any };
  containerStyles?: { [key: string]: any };
  /**
   * @deprecated Don't use as this will be removed in upcoming versions
   */
  allowKeyCodes?: string[];
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: "Upper" | "Lower";
}
