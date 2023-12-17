import { InputAdornment, TextField, Tooltip } from '@mui/material';

import { INumber } from './Number.interface';

export const Number = ({
  id,
  label,
  value,
  unit,
  min,
  max,
  name,
  handleChange,
  helpText,
  variant,
  step = 1,
  dataCy,
  margin,
}: INumber): JSX.Element => {
  const error =
    value !== undefined &&
    ((min !== undefined && value < min) || (max !== undefined && value > max));
  return (
    <Tooltip title={helpText}>
      <TextField
        variant={variant}
        name={name}
        fullWidth
        type="number"
        id={id}
        label={label}
        value={value?.toString()}
        onChange={(e) => handleChange(e)}
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          inputProps: { min: min, max: max, step: step },
          style: { fontWeight: 'bold' },
        }}
        error={error}
        helperText={error ? `Value out of range min: ${min} max: ${max}` : null}
        margin={margin}
        data-cy={dataCy}
      />
    </Tooltip>
  );
};
