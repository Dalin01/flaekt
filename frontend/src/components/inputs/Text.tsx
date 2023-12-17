import { TextField, Tooltip } from '@mui/material';

import { IText } from './Text.interface';

export const Text = ({
  label,
  value,
  handleChange,
  helpText,
  margin,
}: IText): JSX.Element => {
  return (
    <Tooltip title={helpText}>
      <TextField
        fullWidth
        label={label}
        value={value?.toString()}
        onChange={(e) => handleChange(e)}
        margin={margin}
      />
    </Tooltip>
  );
};
