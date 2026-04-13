export class Config {
  inputStyles?: { [key: string]: any };
  containerStyles?: { [key: string]: any };
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  inputMode?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: "Upper" | "Lower";
  separator?:string;
  showError?:boolean;
}
