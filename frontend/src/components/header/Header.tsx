import { Typography } from '@mui/material';

import { content } from '~/config/appContent';

export const Header = () => {
  return (
    <Typography variant="h2" gutterBottom>
      {content.appName}
    </Typography>
  );
};
