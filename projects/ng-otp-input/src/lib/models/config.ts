export class Config {
    inputStyles?: {[key: string]: any};
    containerStyles?: {[key: string]: any};
    allowKeyCodes?: string[];
    length: number;
    allowNumbersOnly?: boolean;
    inputClass?: string;
    containerClass?: string;
    isPasswordInput?: boolean;
    disableAutoFocus?: boolean;
    placeholder?: string;
    letterCase?: 'Upper'| 'Lower';
    inputMode: 'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'|'none';
}
