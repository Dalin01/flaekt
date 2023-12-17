import { IProduct } from '~/hooks/useProduct';

export interface IText {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  width?: string;
  paddingRight?: number;
  handleChange: (e) => void;
  helpText?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  margin?: 'dense' | 'none' | 'normal';
  dataCy?: string;
  validation?: (value: string, products: IProduct[]) => Validation;
  products?: IProduct[];
}

export interface Validation {
  isError: boolean;
  message: string;
}
