export interface INumber {
  id?: string;
  label?: string;
  value?: number;
  float?: boolean;
  unit?: string;
  min?: number;
  max?: number;
  name?: string;
  width?: string;
  paddingRight?: number;
  handleChange: (e) => void;
  helpText?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  step?: number;
  margin?: 'dense' | 'none' | 'normal';
  dataCy?: string;
}
